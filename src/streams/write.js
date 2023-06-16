import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const write = async () => {
  const currentModulePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentModulePath);
  const sourceFolderPath = path.join(currentDirPath, "files");
  const filePath = path.join(sourceFolderPath, "fileToWrite.txt");
  const writableStream = fs.createWriteStream(filePath, "utf8");
  process.stdin.on("data", (data) => {
    writableStream.write(data);
    process.exit();
  });
};

await write();