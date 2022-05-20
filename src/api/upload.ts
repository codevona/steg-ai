// Utils
import fetch from "utils/fetch";

// Entity
import { License } from "entity/License";
import { RequestType, ContentType, Status } from "entity/Helper";
import config from "config";

export interface UploadPreSignedProps {
  name: string;
  content_type: ContentType;
  owner?: string;
  license?: License;
}

export interface UploadPreSignedDataResponse {
  media_id: string;
  upload_url: string;
  ts: string;
  expires: string;
}

export interface UploadPreSignedResponse {
  message: string;
  data: UploadPreSignedDataResponse;
}

export const uploadPreSigned = async ({
  name,
  content_type,
}: UploadPreSignedProps): Promise<UploadPreSignedDataResponse> => {
  const response = await fetch("https://api.steg.ai/upload", {
    method: "POST",
    body: JSON.stringify({ name, content_type }),
    headers: { "x-api-key": config.stegai.api_key },
  });

  const { data } = (await response.json()) as UploadPreSignedResponse;
  return data;
};

export interface UploadProps {
  url: string;
  stream: any;
  content_type: ContentType;
}

export const upload = async ({ url, stream, content_type }: UploadProps) => {
  await fetch(url, {
    method: "PUT",
    body: stream,
    headers: { "Content-Type": content_type },
  });
};

export interface MediaStatusProps {
  request_id: string;
}

export interface MediaStatusDataResponse {
  status: Status;
  request_type: RequestType;
  media_data: {
    media_url: string;
    residual_url: string;
  };
}

export interface MediaStatusResponse {
  message: string;
  data: MediaStatusDataResponse;
}

export const mediaStatus = ({
  request_id,
}: MediaStatusProps): Promise<MediaStatusDataResponse> =>
  new Promise(async (resolve, reject) => {
    while (true) {
      const response = await fetch(
        `https://api.steg.ai/media_status?request_id=${request_id}`,
        { method: "GET", headers: { "x-api-key": config.stegai.api_key } }
      );

      const { message, data } = (await response.json()) as MediaStatusResponse;

      const errors = [
        "Unable to find request item.",
        'Query string parameter "request_id" is required.',
        "Unable to find media item associated with request.",
      ];

      if (errors.includes(message)) return reject(message);
      if (message !== "request_id found.") return reject("unknow error");
      if (data.status === "Error.") return reject("media status error");
      if (data.status === "In progress.") continue;

      return resolve(data);
    }
  });
