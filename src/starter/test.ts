// Loading Env
import "dotenv/config";

// Node
import fs from "fs";
import path from "path";

// Api
import { encodeImage, encodeImageAsync } from "api/encode";
import { decodeImage } from "api/decode";
import fetch from "utils/fetch";

async function main() {
  const filePath = path.join(__dirname, "..", "images", "azuki.png");
  const base64 = fs.readFileSync(filePath, "base64");

  const { media_id, image } = await encodeImage({
    image: base64,
    custom: { hello: "world" },
  });

  const response = await fetch(image, { method: "GET" });
  await download(response);

  const encodeFilePath = path.join(
    __dirname,
    "..",
    "images",
    "encode-azuki.png"
  );

  const encodeBase64 = fs.readFileSync(encodeFilePath, "base64");
  const data = await decodeImage({ image: encodeBase64 });
  console.log(data);
}

async function download(res: any) {
  await new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "..", "images", "encode-azuki.png");
    const fileStream = fs.createWriteStream(filePath);
    res.body.pipe(fileStream);
    res.body.on("error", (err: any) => reject(err));
    fileStream.on("finish", () => resolve(""));
  });
}

main().catch((error) => {
  console.info(error);
  process.exit();
});
