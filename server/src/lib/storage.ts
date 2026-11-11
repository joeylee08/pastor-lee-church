import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEON_STORAGE_BUCKET;

if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing Neon Object Storage configuration");
}

export const bucket = bucketName;

export const storage = new S3Client({
  endpoint,
  region,
  forcePathStyle: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const getPublicUrl = (key: string): string => {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");

  return `${endpoint!.replace(/\/$/, "")}/${bucket}/${encodedKey}`;
};