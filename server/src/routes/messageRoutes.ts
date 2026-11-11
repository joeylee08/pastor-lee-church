import express from "express";

const router = express.Router();

// GET all messages
router.get("/", async (req, res) => {
  // Prisma query here
});

// POST a message
router.post("/", async (req, res) => {
  // Prisma query here
});

// PATCH a message
router.patch("/:id", async (req, res) => {
  // Prisma query here
});

// DELETE a message
router.delete("/:id", async (req, res) => {
  // Prisma query here
});

export default router;