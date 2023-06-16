const parseEnv = () => {
  const prefix = "RSS_";
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix)) {
      const variableName = key.slice(prefix.length);
      console.log(`RSS_${variableName}=${value}`);
    }
  }
};

parseEnv();