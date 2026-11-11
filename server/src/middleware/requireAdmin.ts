import type { RequestHandler } from "express";

const requireAdmin: RequestHandler = (req, res, next) => {
  if (typeof req.session.adminId !== "number") {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
};

export default requireAdmin