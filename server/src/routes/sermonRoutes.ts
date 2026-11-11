import express from "express";

const router = express.Router();

// GET all sermons
router.get("/", async (req, res) => {
	// Prisma query here
});

// POST a sermon
router.post("/", async (req, res) => {
	// Prisma query here
});

// DELETE a sermon
router.delete("/:id", async (req, res) => {
	// Prisma query here
});

export default router;