import express from "express";
import { prisma } from "../lib/prisma.js";
import  requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// GET all messages
router.get("/", async (req, res) => {
  try {
		const messages = await prisma.message.findMany({ orderBy: { date: "desc" }})
		res.status(200).json(messages)
	} catch (error) {
		console.error('Error fetching messages.', error)
	}
});

// POST a message
router.post("/", requireAdmin, async (req, res) => {
  try {
		const { title, date, message } = req.body
		
		if (typeof title !== "string" || typeof date !== "string" || typeof message !== "string" || !title.trim() || !date.trim() || !message.trim()) {
			res.status(400).json({ error: "Title, date, and message are required" });
			return;
    }
		const newMessage = await prisma.message.create({ data: { title, date, message }})
		res.status(201).json(newMessage);
	} catch (error) {
		console.error('Error creating message.', error)
		res.status(500).json({ error: 'Failed to create message.'})
	}
});

// PATCH a message
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
		const id = +req.params.id
		const { title, date, message } = req.body

		if (!Number.isInteger(id) || id <= 0) {
			res.status(400).json({ error: "Invalid message ID" });
      return;
		}
		if (typeof title !== "string" || typeof date !== "string" || typeof message !== "string" || !title.trim() || !date.trim() || !message.trim()) {
			res.status(400).json({ error: "All fields are required" });
      return;
		}

		const updatedMessage = await prisma.message.update({
      where: { id },
      data: { title, date, message },
    });
		res.status(200).json(updatedMessage);

		} catch (error) {
     	console.error("Error updating message:", error);
    	res.status(500).json({ error: "Failed to update message" });
  	}
});

// DELETE a message
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
		const id = +req.params.id
		if (!Number.isInteger(id) || id <= 0) {
			res.status(400).json({ error: "Invalid message ID" });
      return;
		}
		const existingMessage = await prisma.message.findUnique({ where: { id } });
		if (!existingMessage) {
      res.status(404).json({ error: "Message not found" });
      return;
    }
		await prisma.message.delete({ where: { id } });
		res.sendStatus(204);
	} catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;