import { spawn } from "child_process";
import path from "path";

const spawnChildProcess = async (args) => {
  const currentDirPath = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(path.join(currentDirPath, "files"), "script.js");
  const childProcess = spawn("node", [filePath, ...args], {
    stdio: ["pipe", "pipe", process.stderr],
  });

  process.stdin.on("data", (data) => {
    childProcess.stdin.write(data);
  });

  process.stdin.on("end", () => {
    childProcess.stdin.end();
  });

  childProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    process.stdin.unpipe(childProcess.stdin);
    process.stdin.destroy();
  });

  childProcess.on("error", (err) => {
    console.error("Error occurred in child process:", err);
  });
};

spawnChildProcess(["test", "test2"]);