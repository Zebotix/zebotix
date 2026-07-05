import DOMPurify from "dompurify";
import isSvg from "is-svg";
import { JSDOM } from "jsdom";
import sharp from "sharp";

// We use jsdom to provide a window object for DOMPurify on the server
const window = new JSDOM("").window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as unknown as any);

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function validateAndSanitizeUpload(file: File) {
  // 1. Size Validation
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(
      `File size exceeds the 5MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    );
  }

  // 2. MIME Type Validation (Basic)
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed.`);
  }

  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  // 3. Magic Number Validation
  const magic = uint8Array
    .subarray(0, 4)
    .reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");
  let isMagicValid = false;

  // Magic numbers for common formats
  if (
    magic.startsWith("ffd8ffe0") ||
    magic.startsWith("ffd8ffe1") ||
    magic.startsWith("ffd8ffee")
  ) {
    if (file.type === "image/jpeg") isMagicValid = true;
  } else if (magic === "89504e47") {
    if (file.type === "image/png") isMagicValid = true;
  } else if (magic.startsWith("52494646")) {
    if (file.type === "image/webp") isMagicValid = true;
  } else if (magic.startsWith("25504446")) {
    if (file.type === "application/pdf") isMagicValid = true;
  } else if (file.type === "image/svg+xml") {
    const textContent = new TextDecoder().decode(uint8Array);
    if (isSvg(textContent)) {
      isMagicValid = true;
      // 4. SVG Sanitization to prevent XSS via embedded scripts
      const cleanSvg = purify.sanitize(textContent, { USE_PROFILES: { svg: true } });
      return new File([cleanSvg], file.name, { type: "image/svg+xml" });
    }
  }

  if (!isMagicValid) {
    throw new Error(
      "File signature does not match its extension/MIME type. Potentially malicious file."
    );
  }

  // 5. Automatic WebP Conversion and Optimization
  if (file.type.startsWith("image/") && file.type !== "image/svg+xml") {
    try {
      const optimizedBuffer = await sharp(buffer)
        .webp({ quality: 80, effort: 4 })
        .toBuffer();

      const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
      return new File([optimizedBuffer], newName, { type: "image/webp" });
    } catch (error) {
      console.error("Error optimizing image with sharp:", error);
      throw new Error("Failed to process image file.");
    }
  }

  return file;
}
