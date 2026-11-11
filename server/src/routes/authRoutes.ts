import express from "express";

const router = express.Router();

// GET SESSION
router.get("/session", async (req, res) => {
	// Prisma query here
});

// LOGIN
router.post("/login", async (req, res) => {
	// Prisma query here
});

// LOGOUT
router.post("/logout", async (req, res) => {
	// Prisma query here
});


export default router;