import { Buffer } from "node:buffer";

/**
 * Decodes a base64-encoded image string (from OpenAI API responses) into a Buffer.
 */
export function decodeBase64Image(b64Json: string | undefined | null): Buffer {
  return Buffer.from(b64Json ?? "", "base64");
}
