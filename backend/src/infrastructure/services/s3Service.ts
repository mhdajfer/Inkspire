import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

export class S3Service {
  constructor(
    private _s3Client: S3Client = new S3Client({
      region: process.env.AWS_S3_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })
  ) {}

  async getUploadSignedUrl(
    fileName: string,
    fileType: string
  ): Promise<string | null> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
      });

      const signedUrl = await getSignedUrl(this._s3Client, command, {
        expiresIn: 3600,
      });

      return signedUrl;
    } catch (error) {
      console.log("Error while retrieving signed url", error);
      return null;
    }
  }
  async deleteAvatarIfExists(avatarUrl?: string) {
    if (!avatarUrl) return;

    // Extract the S3 key from the URL
    const key = avatarUrl.split(".com/")[1];
    if (!key) return;

    console.log(key, avatarUrl);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    try {
      await this._s3Client.send(deleteCommand);
      console.log(`Deleted old avatar: ${key}`);
    } catch (error) {
      console.error("Error deleting old avatar:", error);
    }
  }
}
