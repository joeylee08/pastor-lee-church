import express from "express";
import { prisma } from "../lib/prisma.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// GET all sermons
router.get("/", async (req, res) => {
	try {
		const sermons = await prisma.sermon.findMany({ orderBy: { createdAt: "desc" }})
		res.status(200).json(sermons)
	} catch (error) {
		console.error('Error fetching sermons.', error)
	}
});

// POST a sermon
router.post("/", requireAdmin, async (req, res) => {
	// Prisma query here
});

// DELETE a sermon
router.delete("/:id", requireAdmin, async (req, res) => {
	// Prisma query here
});

export default router;