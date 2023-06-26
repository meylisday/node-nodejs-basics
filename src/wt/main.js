import { Worker } from 'worker_threads';
import os from 'os';

const createWorkers = () => {
    const cpuCores = os.cpus().length;
    const workers = [];
  
    for (let i = 0; i < cpuCores; i++) {
      const worker = new Worker(new URL('worker.js', import.meta.url), { workerData: i + 10 });
      workers.push(worker);
    }
    return workers;
  };

const performCalculations = async () => {
    const workers = createWorkers();
    const results = [];
  
    for (const worker of workers) {
      const result = await new Promise((resolve) => {
        worker.on('message', resolve);
      });
  
      results.push(result);
    }
  
    console.log(results);
};

await performCalculations();