import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import path from "path";

const decompress = async () => {
    const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
    const compressedFilePath = path.join(
      path.join(currentDirPath, "files"),
      "archive.gz"
    );
    const decompressedFilePath = path.join(
      path.join(currentDirPath, "files"),
      "fileToCompress.txt"
    );
  
    const decompressFile = (compressedFile, decompressedFile) => {
      const handleStream = createReadStream(compressedFile)
        .pipe(createGunzip())
        .pipe(createWriteStream(decompressedFile));
  
      handleStream.on("finish", () => {
        console.log(`Decompression process done: ${compressedFile}`);
      });
    };
  
    decompressFile(compressedFilePath, decompressedFilePath);
};

await decompress();