import express from "express";
import { prisma } from "../lib/prisma.js";
import requireAdmin from "../middleware/requireAdmin.js";
import multer from "multer";
import sharp from "sharp";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { fileTypeFromBuffer } from "file-type";
import { storage, bucket, getPublicUrl } from "../lib/storage.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 5,
  },
});

// GET all photos
router.get("/", async (req, res) => {
	try {
		const photos = await prisma.photo.findMany({ orderBy: { createdAt: "desc" }})
		res.status(200).json(photos)
	} catch (error) {
		console.error('Error fetching photos.', error)
		res.status(500).json({ error: "Failed to fetch photos" });
	}
});

//POST up to 5 photos
router.post("/", requireAdmin, upload.array("files", 5), async (req, res) => {
  const files = req.files as Express.Multer.File[] | undefined;

  if (!files || files.length === 0) {
    res.status(400).json({ error: "No files provided" });
    return;
  }

  const mimeToExtension: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const uploadedPhotoData: { url: string; storageKey: string }[] = [];
  const uploadedKeys: string[] = [];

  try {
		// STEP 1: Validate all files first.
		const validFiles: { file: Express.Multer.File; extension: string; mime: string; }[] = [];

		for (const file of files) {
			const detected = await fileTypeFromBuffer(file.buffer);
			const extension = detected ? mimeToExtension[detected.mime] : undefined;

			if (!extension || !detected) {
				res.status(400).json({ error: `Unsupported file format: ${file.originalname}` });
				return;
			}
			validFiles.push({ file, extension, mime: detected.mime });
		}

		// STEP 2: Upload validated files to Neon Object Storage.
		for (const { file } of validFiles) {
			const storageKey = `photos/${randomUUID()}.webp`;
			const optimizedBuffer = await sharp(file.buffer)
																				.rotate()
																				.resize({
																					width: 1600,
																					height: 1600,
																					fit: "inside",
																					withoutEnlargement: true,
																				})
																				.webp({ quality: 80 })
																				.toBuffer();
			await storage.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: storageKey,
					Body: optimizedBuffer,
					ContentType: "image/webp",
				})
			);
			uploadedKeys.push(storageKey);
			uploadedPhotoData.push({
				url: getPublicUrl(storageKey),
				storageKey,
			});
		}
		// STEP 3: Save all photo records in PostgreSQL.
		const createdPhotos = await prisma.photo.createManyAndReturn({ data: uploadedPhotoData });
		res.status(201).json(createdPhotos);

	} catch (error) {
    console.error("Error uploading photos:", error);

    // cleanup if storage uploads succeeded but DB operation failed
    for (const key of uploadedKeys) {
      try {
        await storage.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          })
        );
      } catch (cleanupError) {
        console.error("Cleanup failed for:", key, cleanupError);
      }
    }
    res.status(500).json({ error: "Photo upload failed" });
  }
});

// DELETE a photo
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid photo ID" });
      return;
    }

    // Find the photo in PostgreSQL.
    const photo = await prisma.photo.findUnique({ where: { id } });

    if (!photo) {
      res.status(404).json({ error: "Photo not found" });
      return;
    }

    // Delete the actual file from Object Storage.
    await storage.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: photo.storageKey,
      })
    );

    // Delete the metadata from PostgreSQL.
    await prisma.photo.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete photo" });
  }
});


export default router;