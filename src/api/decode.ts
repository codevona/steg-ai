// Utils
import fetch from "utils/fetch";

// Entity
import { License } from "entity/License";
import config from "config";

interface DecodeImageProps {
  image: string;
}

interface DecodeImageResponse {
  message: string;
  data: {
    owner: number;
    size: number;
    license: License;
  };
}

export const decodeImage = async ({ image = "" }: DecodeImageProps) => {
  const response = await fetch("https://api.steg.ai/decode_image", {
    method: "POST",
    timeout: 10000000,
    body: JSON.stringify({ image }),
    headers: { "x-api-key": config.stegai.api_key },
  });

  const { data } = await response.json();

  return data;
};
