import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import readline from "node:readline";
import dotenv from "dotenv";
import { glob, globSync } from "glob";
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

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = "dist";
const MAX_S3_KEYS = 500;
const MAX_BRANCHES = 10;

dotenv.config({ path: "./.env" });

/**
 * Configuration object for AWS services
 */
const createAWSConfig = () => ({
  region: process.env.awsRegion,
  credentials: {
    accessKeyId: process.env.awsAccessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

/**
 * Application settings
 */
const appSettings = {
  bucket: process.env.appBucket,
  appId: process.env.appId,
};

/**
 * Prompts user for confirmation before deployment
 * @param {string} environment - The deployment environment
 * @returns {Promise<boolean>} - User confirmation
 */
const getUserConfirmation = async (environment) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) =>
    new Promise((resolve) => {
      rl.question(query, resolve);
    });

  try {
    console.log(
      `\n⚠️  WARNING: You are about to deploy to environment: "${environment}"`
    );
    console.log("This will delete existing files and upload new ones.");

    const confirmText = `deploy-${environment.toLowerCase()}`;
    const userInput = await question(
      `\nTo confirm deployment, please type: ${confirmText}\n> `
    );

    const isConfirmed = userInput.trim() === confirmText;

    if (!isConfirmed) {
      console.log("❌ Deployment cancelled");
    }

    return isConfirmed;
  } finally {
    rl.close();
  }
};

/**
 * Validates required configuration
 * @param {Object} awsConfig - AWS configuration
 * @param {Object} appConfig - App configuration
 * @throws {Error} - If configuration is invalid
 */
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

/**
 * Gets build files from the build directory
 * @returns {string[]} - Array of file paths
 * @throws {Error} - If no build files found
 */
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

/**
 * Validates that the deployment branch exists
 * @param {AmplifyClient} amplifyClient - Amplify client instance
 * @param {string} appId - Amplify app ID
 * @param {string} branchName - Branch name to validate
 * @returns {Promise<boolean>} - Whether branch exists
 */
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

/**
 * Clears existing files from S3 bucket
 * @param {S3Client} s3Client - S3 client instance
 * @param {string} bucket - S3 bucket name
 * @param {string} prefix - S3 key prefix
 */
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

/**
 * Uploads files to S3
 * @param {S3Client} s3Client - S3 client instance
 * @param {string} bucket - S3 bucket name
 * @param {string} prefix - S3 key prefix
 * @param {string[]} filePaths - Array of local file paths
 */
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

/**
 * Triggers Amplify deployment
 * @param {AmplifyClient} amplifyClient - Amplify client instance
 * @param {string} appId - Amplify app ID
 * @param {string} branchName - Branch name
 * @param {string} bucket - S3 bucket name
 * @param {string} prefix - S3 key prefix
 */
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
      process.exit(0);
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
