import { promises as fsPromises, constants as fsConstants } from "fs";
import path from "path";

const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(path.join(currentDirPath,"files"), "fileToRemove.txt");

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