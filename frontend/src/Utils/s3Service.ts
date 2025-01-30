import axios from "axios";
import { axiosInstance } from "./axios";

interface Response {
  success: boolean;
  message: string;
}

export const getUploadUrl = async (filename: string, fileType: string) => {
  const response = await axiosInstance.post("/blogs/cover", {
    filename,
    fileType,
  });

  return response.data as Response & { uploadUrl: string };
};

export const uploadFileToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  try {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    console.log("Uploading file:", file.name, "Size:", file.size);

    await axios.put(presignedUrl, file, options);

    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
