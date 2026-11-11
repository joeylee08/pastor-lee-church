
import express from "express";
import * as argon2 from "argon2";
import { rateLimit } from "express-rate-limit";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// LOGIN
router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string" || !password) {
      res.status(400).json({ error: "Username and password required" });
      return;
    }

    const admin = await prisma.admin.findUnique({ where: { username: username.trim().toLowerCase() } });

    if (!admin || !(await argon2.verify(admin.passwordHash, password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.adminId = admin.id;
      req.session.save((err) => {
        if (err) return next(err);

        res.status(200).json({
          id: admin.id,
          username: admin.username,
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

// CHECK SESSION
router.get("/session", (req, res) => {
  res.json({ authenticated: typeof req.session.adminId === "number" });
});

// LOGOUT
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("church.sid");
    res.sendStatus(204);
  });
});

export default router;
