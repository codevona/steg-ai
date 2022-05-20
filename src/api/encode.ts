// Utils
import fetch from "utils/fetch";

// Entity
import { Iptc } from "entity/Iptc";
import { License } from "entity/License";
import config from "config";

export interface EncodeImageProps {
  image: string;
  owner?: string;
  media_id?: string;

  iptc?: Iptc;
  license?: License;
  custom: { [key: string]: any };
}

export interface EncodeImageDataResponse {
  media_id: string;
  image: string;
  size: number;
  residual: string;
}
export interface EncodeImageResponse {
  message: string;
  data: EncodeImageDataResponse;
}

export const encodeImage = async ({
  image = "",
  custom = {},
}: EncodeImageProps) => {
  const response = await fetch("https://api.steg.ai/encode_image", {
    method: "POST",
    timeout: 10000000,
    body: JSON.stringify({ image, custom }),
    headers: { "x-api-key": config.stegai.api_key },
  });

  const { data } = await response.json();

  return data;
};

export interface EncodeImageAsyncProps {
  media_id: string;
  custom: { [key: string]: any };
  owner?: string;
  license?: License;
  iptc?: Iptc;
}

export interface EncodeImageAsyncResponse {
  message: string;
  data: {
    encode_media_id: string;
    request_id: string;
  };
}

export const encodeImageAsync = async ({
  media_id,
  custom,
}: EncodeImageAsyncProps) => {
  const response = await fetch("https://api.steg.ai/encode_image_async", {
    method: "POST",
    body: JSON.stringify({ media_id, custom }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.stegai.api_key,
    },
  });

  const { data } = await response.json();
  return data;
};
