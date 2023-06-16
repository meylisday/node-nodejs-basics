import { promises as fsPromises, constants as fsConstants } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");

async function checkMissingFolder() {
  try {
    await fsPromises.access(sourceFolderPath, fsConstants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}

const list = async () => {
  if (await checkMissingFolder()) {
    try {
      const files = await fsPromises.readdir(sourceFolderPath);
      console.log(files);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("FS operation failed");
  }
};

await list();
