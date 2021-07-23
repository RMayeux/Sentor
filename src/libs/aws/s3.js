import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export const s3PutObject = async (Body, Bucket, Key) => s3.putObject({ Body, Bucket, Key }).promise();

export const s3GetObject = async (Bucket, Key) => s3.getObject({ Bucket, Key }).promise();
