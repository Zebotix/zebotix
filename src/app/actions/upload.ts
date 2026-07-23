"use server";

import fs from "node:fs/promises";
import path from "node:path";

import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

import { secureRandom } from "@/lib/utils";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create unique filename using timestamp and random string
    const uniqueId = Date.now() + "-" + Math.round(secureRandom() * 1e9);
    const filename = `${uniqueId}.webp`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure dir exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);

    // Convert to webp and save
    await sharp(buffer).webp({ quality: 80 }).toFile(filepath);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to optimize and upload image" };
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFileToCloudinaryAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "zebotix/estimates" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return { success: true, url: (result as { secure_url: string }).secure_url };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: "Failed to upload file to Cloudinary" };
  }
}
