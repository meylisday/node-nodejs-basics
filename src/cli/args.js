const parseArgs = () => {
  for (let i = 2; i < process.argv.length; i += 2) {
    const argName = process.argv[i].slice(2);
    const argValue = process.argv[i + 1];
    console.log(`${argName} is ${argValue}`);
  }
};

parseArgs();