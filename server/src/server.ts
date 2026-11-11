import express from "express";
import "dotenv/config";

import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import messageRoutes from "./routes/messageRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import sermonRoutes from "./routes/sermonRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const secret = process.env.SESSION_SECRET;
const databaseUrl = process.env.DATABASE_URL_POOLED;

if (!secret || !databaseUrl) { throw new Error("Missing session configuration") }

const PgSession = connectPgSimple(session);

if (process.env.NODE_ENV === "production") { app.set("trust proxy", 1) }

app.use(session({
  name: "church.sid",
  store: new PgSession({
    conString: databaseUrl,
    createTableIfMissing: true,
  }),
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 8 * 60 * 60 * 1000,
  },
}));

app.use(express.json());

// Register routes
app.use("/api/messages", messageRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api", authRoutes);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
