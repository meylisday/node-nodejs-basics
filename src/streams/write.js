import fs from "fs";
import path from "path";

const write = async () => {
  const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(
    path.join(currentDirPath, "files"),
    "fileToWrite.txt"
  );

  const writableStream = fs.createWriteStream(filePath, "utf8");
  
  process.stdin.on("data", (data) => {
    writableStream.write(data);
    process.exit();
  });
};

await write();