import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import path from 'path';


const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToAWS(file: File) {
  try {

    if (!file) return false;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${randomBytes(10).toString('hex')}${path.extname(file.name)}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function deleteFileFromAWS(fileUrl: string) {
  try {
    if (!fileUrl) return false;

    const url = new URL(fileUrl);
    const fileName = url.pathname.split('/').pop(); // Obtiene solo el nombre del archivo

    if (!fileName) return false;

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
      })
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
