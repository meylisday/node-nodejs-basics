import { promises as fsPromises, constants as fsConstants } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");
const destinationFolderPath = path.join(currentDirPath, "files_copy");

async function checkSourceFolderAccess() {
  try {
    await fsPromises.access(sourceFolderPath, fsConstants.R_OK);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function checkDestinationFolder() {
  try {
    await fsPromises.access(destinationFolderPath, fsConstants.F_OK);
    return false;
  } catch (error) {
    return true;
  }
}

const copy = async () => {
  if ((await checkSourceFolderAccess()) && (await checkDestinationFolder())) {
    try {
      await fsPromises.mkdir(destinationFolderPath);
      const files = await fsPromises.readdir(sourceFolderPath);
      for (const file of files) {
        const sourceFilePath = path.join(sourceFolderPath, file);
        const destinationFilePath = path.join(destinationFolderPath, file);
        await fsPromises.copyFile(sourceFilePath, destinationFilePath);
      }
      console.log("Files folder copied successfully!");
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("FS operation failed");
  }
};

await copy();
