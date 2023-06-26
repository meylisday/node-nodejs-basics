import { promises as fsPromises } from "fs";
import path from "path";

const create = async () => {
  const folderPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "files"
  );
  const filePath = path.join(folderPath, "fresh.txt");

  if (await fsPromises.existsSync(filePath)) {
    throw new Error("FS operation failed");
  }

  await fsPromises.writeFileSync(filePath, "I am fresh and young");

  console.log("Fresh file created successfully!");
};

await create();