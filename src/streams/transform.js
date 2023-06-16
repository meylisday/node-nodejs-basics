import { Transform } from "stream";

const transform = async () => {
  process.stdin.setEncoding("utf8");
  process.stdin.once("data", (data) => {
    const reversedText = data.trim().split("").reverse().join("");
    process.stdout.write(reversedText + "\n");
    process.exit();
  });
};

await transform();