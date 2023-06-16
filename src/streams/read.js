import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const read = async () => {
  const currentModulePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentModulePath);
  const sourceFolderPath = path.join(currentDirPath, "files");
  const filePath = path.join(sourceFolderPath, "fileToRead.txt");
  const readableStream = fs.createReadStream(filePath, "utf8");

  readableStream.on("data", function (chunk) {
    process.stdout.write(`${chunk}\n`);
  });
};

await read();