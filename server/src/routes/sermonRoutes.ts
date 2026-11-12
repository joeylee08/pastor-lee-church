import express from "express";
import { prisma } from "../lib/prisma.js";
import requireAdmin from "../middleware/requireAdmin.js";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { storage, bucket, getPublicUrl } from "../lib/storage.js";
import JSZip from "jszip";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024,
    files: 1,
  },
});

// GET all sermons
router.get("/", async (req, res) => {
	try {
		const sermons = await prisma.sermon.findMany({ orderBy: { createdAt: "desc" }})
		res.status(200).json(sermons)
	} catch (error) {
		console.error('Error fetching sermons.', error)
		res.status(500).json({ error: "Failed to fetch sermons." });
	}
});

//POST a sermon
router.post("/", requireAdmin, upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "No PowerPoint provided" });
    return;
  }
  // Get the file extension.
  const extension = file.originalname.match(/\.(pptx|ppt)$/i)?.[1]?.toLowerCase();

  if (!extension) {
    res.status(400).json({ error: "Invalid PowerPoint extension" });
    return;
  }
  // Verify the file contents.
  let valid = false;
  if (extension === "pptx") {
    try {
      const zip = await JSZip.loadAsync(file.buffer);
      valid = Boolean(zip.file("[Content_Types].xml") && zip.file("ppt/presentation.xml"));
    } catch {
      valid = false;
    }
  } else {
    // Older .ppt files use a different file format.
    const signature = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    valid = file.buffer.subarray(0, 8).equals(signature);
  }

  if (!valid) {
    res.status(400).json({ error: "Invalid PowerPoint file" });
    return;
  }
  // Generate the display title and unique storage key.
  const title = file.originalname
											.replace(/\.pptx?$/i, "")
											.trim()
											.slice(0, 200);
  if (!title) {
    res.status(400).json({ error: "Invalid sermon title" });
    return;
  }

  const key = `sermons/${randomUUID()}.${extension}`;

  const contentType = extension === "pptx"
																			? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
																			: "application/vnd.ms-powerpoint";
  let uploaded = false;

  try {
    // Upload the PowerPoint to Neon Object Storage.
    await storage.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: contentType,
      })
    );

    uploaded = true;

    // Save the sermon information in PostgreSQL.
    const sermon = await prisma.sermon.create({
			data: {
				title,
				fileName: file.originalname,
				storageKey: key,
				url: getPublicUrl(key),
			},
		});

    res.status(201).json(sermon);

  } catch (error) {
    console.error("Sermon upload failed:", error);

    // Clean up the uploaded file if the database operation fails.
    if (uploaded) {
      try {
        await storage.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          })
        );
      } catch (cleanupError) {
        console.error("Storage cleanup failed:", cleanupError);
      }
    }
    res.status(500).json({ error: "Failed to upload sermon" });
  }
});

// DELETE a sermon
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = +req.params.id
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid sermon ID" });
      return;
    }
    // Find the sermon in PostgreSQL
    const sermon = await prisma.sermon.findUnique({ where: { id } });
    if (!sermon) {
      res.status(404).json({ error: "Sermon not found" });
      return;
    }
    // Delete the PowerPoint from Neon Object Storage
    await storage.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: sermon.storageKey,
      })
    );
    // Delete its database record
    await prisma.sermon.delete({ where: { id }});
    res.sendStatus(204);
  } catch (error) {
    console.error("Sermon deletion failed:", error);
    res.status(500).json({ error: "Failed to delete sermon" });
  }
});

export default router;