import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const calculateHash = async () => {
  const currentModulePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentModulePath);
  const sourceFolderPath = path.join(currentDirPath, "files");
  const filePath = path.join(sourceFolderPath, "fileToCalculateHashFor.txt");
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");

  console.log(hex);
};

await calculateHash();