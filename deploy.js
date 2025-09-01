import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import dotenv from "dotenv";
import { glob, globSync } from "glob";
import mime from "mime-types";
import { execSync } from "child_process";
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
const projectRoot = path.join(__dirname);

dotenv.config({ path: "./.env" });
const buildDir = "dist";

const awsconfig = {
  accessKeyId: process.env.awsAccessKeyId,
  secretKey: process.env.secretAccessKey,
  awsRegion: process.env.awsRegion,
};

const appSettings = {
  bucket: process.env.appBucket,
  appId: process.env.appId,
};

const getBranch = () => {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    return branch;
  } catch (e) {
    return null;
  }
};

const deployApp = async (prefix = "") => {
  console.log("starting deployment", awsconfig, appSettings);
  if (!prefix) {
    console.log("Failed...\nEnviorment not specified");
    return 0;
  }
  if (!awsconfig?.accessKeyId && !awsconfig?.secretKey)
    console.log("Failed...\n AWS config not found..");
  if (!appSettings.appId && !appSettings.bucket)
    console.log("Failed...\n App settings config not found..");

  const fileList = globSync(buildDir + "/**/*", { nodir: true });
  if (!fileList?.length)
    console.error("Build failed.Build folder " + prefix + " is empty..");
  else {
    const amplify = new AmplifyClient({
      region: awsconfig.awsRegion,
      credentials: {
        accessKeyId: awsconfig.accessKeyId,
        secretAccessKey: awsconfig.secretKey,
      },
    });
    const { branches } = await amplify.send(
      new ListBranchesCommand({ appId: appSettings.appId, maxResults: 10 })
    );

    if (!branches?.length) {
      console.log("No active deployments...");
      return null;
    } else {
      const isExist = branches.find((x) => x.branchName == prefix);
      if (!isExist) {
        console.log("No deployments found with this name " + prefix);
        return null;
      }
    }
    console.log("Total files " + fileList?.length);
    const s3 = new S3Client({
      region: awsconfig.awsRegion,
      credentials: {
        accessKeyId: awsconfig.accessKeyId,
        secretAccessKey: awsconfig.secretKey,
      },
    });
    // execSync('git pull origin main');
    const { Contents = [] } = await s3.send(
      new ListObjectsV2Command({
        Bucket: appSettings.bucket,
        Prefix: prefix + "/",
        MaxKeys: 500,
      })
    );
    if (Contents.length) {
      const keysToDelete = Contents.filter(
        (o) => o.Key && o.Key !== prefix + "/"
      ).map((o) => ({ Key: o.Key }));
      if (keysToDelete.length) {
        await s3.send(
          new DeleteObjectsCommand({
            Bucket: appSettings.bucket,
            Delete: { Objects: keysToDelete, Quiet: true },
          })
        );
        console.log(`Deleted ${keysToDelete.length} objects under ` + prefix);
      } else {
        console.log("No objects to delete");
      }
    }
    console.log("Starting S3 upload");
    for (const filePath of fileList) {
      const body = fs.createReadStream(filePath);
      const key = path
        .join(prefix, path.relative(buildDir, filePath))
        .replace(/\\/g, "/");
      await s3.send(
        new PutObjectCommand({
          Bucket: appSettings.bucket,
          Key: key,
          Body: body,
          ContentType: mime.lookup(filePath) || "application/octet-stream",
          CacheControl: "no-cache, no-store, must-revalidate",
        })
      );
      console.log("uploaded ", filePath);
    }

    console.log("Deploying updates from S3 to Amplify");

    await amplify.send(
      new StartDeploymentCommand({
        appId: appSettings.appId,
        branchName: prefix,
        sourceUrl: `s3://${appSettings.bucket}/${prefix}/`,
        sourceUrlType: "BUCKET_PREFIX",
      })
    );
    console.log("Amplify deployed");
  }
};
deployApp(process.argv[2]);
