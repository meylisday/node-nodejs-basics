import { promises as fsPromises, constants as fsConstants } from "fs";
import path from "path";

const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
const folderPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "files"
);
const destinationFolderPath = path.join(currentDirPath, "files_copy");

async function checkSourceFolderAccess() {
  try {
    await fsPromises.access(folderPath, fsConstants.R_OK);
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
      const files = await fsPromises.readdir(folderPath);
      for (const file of files) {
        const sourceFilePath = path.join(folderPath, file);
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
