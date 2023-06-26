import crypto from "crypto";
import { promises as fsPromises } from "fs";
import path from "path";

const calculateHash = async () => {
  const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(
    path.join(currentDirPath, "files"),
    "fileToCalculateHashFor.txt"
  );

  const fileBuffer = await fsPromises.readFile(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");

  console.log(hex);
};

await calculateHash();