import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import fs from 'fs';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import './files/c.js';

const random = Math.random();

let unknownObject;

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);
const sourceFolderPath = path.join(currentDirPath, "files");
const filePathA = path.join(sourceFolderPath, "a.json");
const filePathB = path.join(sourceFolderPath, "b.json");

if (random > 0.5) {
  unknownObject = JSON.parse(fs.readFileSync(filePathA, 'utf8'));
} else {
  unknownObject = JSON.parse(fs.readFileSync(filePathB, 'utf8'));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };