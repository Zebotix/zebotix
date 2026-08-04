import { Readable } from "node:stream";

import cloudinary from "../../cloudinary";
import { type StorageProvider } from "../types/provider";

export class CloudinaryStorageProvider implements StorageProvider {
  name = "Cloudinary";

  async upload(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    folder: string = "zebotix_blog"
  ): Promise<{
    url: string;
    width?: number;
    height?: number;
    size?: number;
  }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `zebotix/${folder}`,
          resource_type: "auto",
          public_id: filename.replace(/\.[^/.]+$/, ""), // Remove extension
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            let errorMessage: string;
            if (error?.message) {
              errorMessage = String(error.message);
            } else if (typeof error === "string") {
              errorMessage = error;
            } else {
              errorMessage = JSON.stringify(error);
            }
            return reject(new Error(errorMessage));
          }
          if (!result) {
            return reject(new Error("No result from Cloudinary"));
          }
          resolve({
            url: result.secure_url,
            width: result.width,
            height: result.height,
            size: result.bytes,
          });
        }
      );

      const readableStream = new Readable({
        read() {
          this.push(fileBuffer);
          this.push(null);
        },
      });

      readableStream.pipe(uploadStream);
    });
  }

  async uploadFromUrl(
    imageUrl: string,
    folder: string = "zebotix_blog"
  ): Promise<{
    url: string;
    width?: number;
    height?: number;
    size?: number;
  }> {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: `zebotix/${folder}`,
        resource_type: "image",
      });
      return {
        url: result.secure_url,
        width: result.width,
        height: result.height,
        size: result.bytes,
      };
    } catch (error) {
      console.error("Cloudinary uploadFromUrl error:", error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      const errorMessage = typeof error === "string" ? error : JSON.stringify(error);
      throw new Error(errorMessage);
    }
  }
}
