import { promises as fsPromises, constants as fsConstants } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");
const filePath = path.join(sourceFolderPath, "fileToRemove.txt");

async function checkMissingFile() {
  try {
    await fsPromises.access(filePath, fsConstants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}
const remove = async () => {
    if (await checkMissingFile()) {
        try {
          await fsPromises.rm(filePath);
          console.log("File removed successfully!");
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log("FS operation failed");
      }
};

await remove();