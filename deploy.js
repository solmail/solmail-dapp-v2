import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import dotenv from "dotenv";
import { globSync } from "glob";
import mime from "mime-types";

import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AmplifyClient,
  StartDeploymentCommand,
  ListBranchesCommand,
} from "@aws-sdk/client-amplify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = "dist";
const MAX_S3_KEYS = 500;
const MAX_BRANCHES = 10;

dotenv.config({ path: "./.env" });

const createAWSConfig = () => ({
  region: process.env.awsRegion,
  credentials: {
    accessKeyId: process.env.awsAccessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const appSettings = {
  bucket: process.env.appBucket,
  appId: process.env.appId,
};

const getUserConfirmation = async (environment) => {
  console.log(
    `\n⚠️  WARNING: You are about to deploy to environment: "${environment}"`
  );
  console.log("This will delete existing files and upload new ones.");

  const filePath = path.join("dist", "build-info.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const buildInfo = JSON.parse(rawData);

  const isConfirmed = buildInfo.mode === environment;

  if (!isConfirmed) {
    console.log(
      `❌ Build mismatch, dist folder contains ${buildInfo.mode} build.`
    );
  }

  return isConfirmed;
};

const validateConfiguration = (awsConfig, appConfig) => {
  const errors = [];

  if (!awsConfig.credentials.accessKeyId) {
    errors.push("AWS Access Key ID is missing");
  }

  if (!awsConfig.credentials.secretAccessKey) {
    errors.push("AWS Secret Access Key is missing");
  }

  if (!awsConfig.region) {
    errors.push("AWS Region is missing");
  }

  if (!appConfig.appId) {
    errors.push("Amplify App ID is missing");
  }

  if (!appConfig.bucket) {
    errors.push("S3 Bucket name is missing");
  }

  if (errors.length > 0) {
    throw new Error(
      `Configuration errors:\n${errors.map((e) => `- ${e}`).join("\n")}`
    );
  }
};

const getBuildFiles = () => {
  const fileList = globSync(`${BUILD_DIR}/**/*`, { nodir: true });

  if (!fileList?.length) {
    throw new Error(
      `Build failed. Build folder "${BUILD_DIR}" is empty or doesn't exist.`
    );
  }

  console.log(`📁 Found ${fileList.length} files to upload`);
  return fileList;
};

const validateBranch = async (amplifyClient, appId, branchName) => {
  try {
    const { branches } = await amplifyClient.send(
      new ListBranchesCommand({
        appId,
        maxResults: MAX_BRANCHES,
      })
    );

    if (!branches?.length) {
      throw new Error("No active deployments found");
    }

    const branchExists = branches.some(
      (branch) => branch.branchName === branchName
    );

    if (!branchExists) {
      throw new Error(`No deployment branch found with name: ${branchName}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to validate branch: ${error.message}`);
  }
};

const clearS3Directory = async (s3Client, bucket, prefix) => {
  try {
    const { Contents = [] } = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: `${prefix}/`,
        MaxKeys: MAX_S3_KEYS,
      })
    );

    const objectsToDelete = Contents.filter(
      (obj) => obj.Key && obj.Key !== `${prefix}/`
    ).map((obj) => ({ Key: obj.Key }));

    if (objectsToDelete.length > 0) {
      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: objectsToDelete,
            Quiet: true,
          },
        })
      );
      console.log(`🗑️  Deleted ${objectsToDelete.length} existing objects`);
    } else {
      console.log("📁 No existing objects to delete");
    }
  } catch (error) {
    throw new Error(`Failed to clear S3 directory: ${error.message}`);
  }
};

const uploadFilesToS3 = async (s3Client, bucket, prefix, filePaths) => {
  console.log("⬆️  Starting S3 upload...");

  let uploadedCount = 0;

  for (const filePath of filePaths) {
    try {
      const body = fs.createReadStream(filePath);
      const key = path
        .join(prefix, path.relative(BUILD_DIR, filePath))
        .replace(/\\/g, "/");

      const contentType = mime.lookup(filePath) || "application/octet-stream";

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
          CacheControl: "no-cache, no-store, must-revalidate",
        })
      );

      uploadedCount++;
      console.log(
        `✅ [${uploadedCount}/${filePaths.length}] ${path.relative(BUILD_DIR, filePath)}`
      );
    } catch (error) {
      throw new Error(`Failed to upload ${filePath}: ${error.message}`);
    }
  }

  console.log(`🎉 Successfully uploaded ${uploadedCount} files to S3`);
};

const triggerAmplifyDeployment = async (
  amplifyClient,
  appId,
  branchName,
  bucket,
  prefix
) => {
  try {
    console.log("🚀 Triggering Amplify deployment...");

    await amplifyClient.send(
      new StartDeploymentCommand({
        appId,
        branchName,
        sourceUrl: `s3://${bucket}/${prefix}/`,
        sourceUrlType: "BUCKET_PREFIX",
      })
    );

    console.log("✅ Amplify deployment started successfully");
  } catch (error) {
    throw new Error(`Failed to trigger Amplify deployment: ${error.message}`);
  }
};

const deployApp = async (environment) => {
  console.log(`\n🚀 AWS Amplify Deployment Script`);
  console.log(`📦 Environment: ${environment || "NOT SPECIFIED"}`);

  try {
    if (!environment) {
      throw new Error(
        "Environment not specified. Usage: node deploy.js <environment>"
      );
    }

    const awsConfig = createAWSConfig();
    validateConfiguration(awsConfig, appSettings);

    const confirmed = await getUserConfirmation(environment);
    if (!confirmed) {
     // process.exit(0);
    }

    const filePaths = getBuildFiles();

    const s3Client = new S3Client(awsConfig);
    const amplifyClient = new AmplifyClient(awsConfig);

    await validateBranch(amplifyClient, appSettings.appId, environment);

    await clearS3Directory(s3Client, appSettings.bucket, environment);

    await uploadFilesToS3(s3Client, appSettings.bucket, environment, filePaths);

    await triggerAmplifyDeployment(
      amplifyClient,
      appSettings.appId,
      environment,
      appSettings.bucket,
      environment
    );

    console.log(`\n🎉 Deployment to "${environment}" completed successfully!`);
  } catch (error) {
    console.error(`\n❌ Deployment failed: ${error.message}`);
    process.exit(1);
  }
};

const environment = process.argv[2];
deployApp(environment);
