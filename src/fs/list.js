import { promises as fsPromises, constants as fsConstants } from "fs";
import path from "path";

const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
const folderPath = path.join(currentDirPath,"files");

async function checkMissingFolder() {
  try {
    await fsPromises.access(folderPath, fsConstants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}

const list = async () => {
  if (await checkMissingFolder()) {
    try {
      const files = await fsPromises.readdir(folderPath);
      console.log(files);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("FS operation failed");
  }
};

await list();
