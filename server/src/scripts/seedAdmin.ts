import { prisma } from "../lib/prisma.ts";
import * as argon2 from "argon2";

const username = process.env.ADMIN_USERNAME?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!username || !password || password.length < 12) {
  throw new Error("Invalid admin credentials");
}

const existing = await prisma.admin.findUnique({ where: { username } });

if (!existing) {
  await prisma.admin.create({
    data: {
      username,
      passwordHash: await argon2.hash(password),
    },
  });
}