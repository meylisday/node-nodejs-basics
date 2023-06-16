import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import path from "path";

const compress = async () => {
    const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(
      path.join(currentDirPath, "files"),
      "fileToCompress.txt"
    );
    const compressFile = (file) => {
      const handleStream = createReadStream(file)
      handleStream
        .pipe(createGzip())
        .pipe(createWriteStream(path.join(path.join(currentDirPath, "files"),
            "archive.gz")))
        .on('finish', () => {
          console.log(`Compression process done: ${file}`)
        });
    };
    compressFile(filePath);
};

await compress();