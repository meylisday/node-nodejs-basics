import { promises as fsPromises, constants as fsConstants } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");
const filePath = path.join(sourceFolderPath, "fileToRead.txt");

async function checkMissingFile() {
  try {
    await fsPromises.access(filePath, fsConstants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}
const read = async () => {
  if (await checkMissingFile()) {
    try {
      const content = await fsPromises.readFile(filePath, "utf8");
      console.log(content);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("FS operation failed");
  }
};

await read();