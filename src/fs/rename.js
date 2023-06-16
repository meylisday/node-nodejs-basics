import { promises as fsPromises, constants as fsConstants } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");
const TxtFilePath = path.join(sourceFolderPath, "wrongFilename.txt");
const MdFilePath = path.join(sourceFolderPath, "properFilename.md");

async function checkMissingTxtFile() {
  try {
    await fsPromises.access(TxtFilePath, fsConstants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function checkExistsMdFile() {
  try {
    await fsPromises.access(MdFilePath, fsConstants.F_OK);
    return false;
  } catch (error) {
    return true;
  }
}

const rename = async () => {
  if ((await checkMissingTxtFile()) && (await checkExistsMdFile())) {
    try {
      await fsPromises.rename(TxtFilePath, MdFilePath);
      console.log("File renamed successfully!");
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("FS operation failed");
  }
};

await rename();