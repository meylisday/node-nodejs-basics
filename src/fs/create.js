import fs from "fs";
import path from "path";

const create = async () => {
  const folderPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "files"
  );
  const filePath = path.join(folderPath, "fresh.txt");

  if (fs.existsSync(filePath)) {
    throw new Error("FS operation failed");
  }

  fs.writeFileSync(filePath, "I am fresh and young");

  console.log("Fresh file created successfully!");
};

await create();