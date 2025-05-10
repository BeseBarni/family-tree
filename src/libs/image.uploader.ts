import { apiClient } from "./axios.client";
import { imageServiceUploadUrl } from "src/utils/api.urls";

export async function uploadImage(
  file: File,
  fileName: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file, fileName);
  formData.append("fileName", fileName);
  formData.append("publickKey", "public_OMba77EnO8mo9eJXO5xB/oUS+4E=");

  const result = await apiClient.post(imageServiceUploadUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data.url;
}
