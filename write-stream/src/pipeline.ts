import fs from 'fs';
import { pipeline } from 'stream';
import { formateadorCSV } from './etl';

const input = fs.createReadStream('big.csv');
const transformer = new formateadorCSV();
const output = fs.createWriteStream('final.txt');

const intervalo = setInterval(() => {
    const mb = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Uso de memoria: ${Math.round(mb * 100) / 100} MB`);
}, 500);

pipeline(input, transformer, output, (err) => {
    clearInterval(intervalo);
    if (err) {
        console.error('Pipeline falló', err);
    } else {
        console.log('Pipeline completado exitosamente');
    }
});