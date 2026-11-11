import express from "express";

const router = express.Router();

// GET all photos
router.get("/", async (req, res) => {
	// Prisma query here
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