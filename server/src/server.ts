import express from "express";

import messageRoutes from "./routes/messageRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import sermonRoutes from "./routes/sermonRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// Register routes
app.use("/api/messages", messageRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api", authRoutes);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
