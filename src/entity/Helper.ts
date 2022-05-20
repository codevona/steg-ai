export type ContentType =
  | "image/bmp"
  | "image/jpeg"
  | "image/png"
  | "image/tiff"
  | "image/webp";

export type Status = "In progress." | "Error." | "Completed.";

export type RequestType = "encode" | "decode" | "detect";

export interface StegAiResponse<T> {
  message: string;
  data: T;
}
