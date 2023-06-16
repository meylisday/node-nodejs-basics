import { promises as fsPromises, constants as fsConstants } from "fs";
import path from "path";

const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(path.join(currentDirPath,"files"), "fileToRead.txt");

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