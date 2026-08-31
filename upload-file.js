import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

// Run command
// R2_ACCOUNT_ID=xxxx R2_ACCESS_KEY_ID=xxxx R2_SECRET_ACCESS_KEY=xxxx node upload-file.js 
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadLargeFile(filePath, bucket, key) {
  const fileStream = fs.createReadStream(filePath);

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: bucket,
      Key: key,
      Body: fileStream,
    },
    // tuning knobs:
    partSize: 100 * 1024 * 1024, // 100MB per part
    queueSize: 4,                // parallel part uploads
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log(`Uploaded ${progress.loaded} / ${progress.total} bytes`);
  });

  await upload.done();
  console.log("Upload complete");
}

uploadLargeFile(
  "/path/to/AnimationReel_JamesLin2026.mov",
  "videos",
  "AnimationReel_JamesLin2026.mov"
);