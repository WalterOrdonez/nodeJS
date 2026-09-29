import { parentPort } from "node:worker_threads";

parentPort.once('message', ({ iterations }) => {
    for (let i = 0; i < iterations; i++) {
        // Simulate heavy CPU work
    }
    parentPort.postMessage('CPU terminada en un Worker Thread. El event loop siguio libre');
});