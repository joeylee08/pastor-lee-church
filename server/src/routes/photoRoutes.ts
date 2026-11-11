import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

// GET all photos
router.get("/", async (req, res) => {
	try {
		const photos = await prisma.photo.findMany({ orderBy: { createdAt: "desc" }})
		res.status(200).json(photos)
	} catch (error) {
		console.error('Error fetching photos.', error)
	}
});

// POST a photo
router.post("/", async (req, res) => {
	// Prisma query here
});

// DELETE a photo
router.delete("/:id", async (req, res) => {
	// Prisma query here
});

export default router;