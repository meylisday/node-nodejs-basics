import fs from "fs";
import path from "path";

const read = async () => {
  const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(
    path.join(currentDirPath, "files"),
    "fileToRead.txt"
  );
  
  const readableStream = fs.createReadStream(filePath, "utf8");

  readableStream.on("data", function (chunk) {
    process.stdout.write(`${chunk}\n`);
  });
};

await read();
