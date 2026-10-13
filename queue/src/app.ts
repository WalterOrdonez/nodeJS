
import { PriorityQueue } from './queue';

const queue = new PriorityQueue();
console.log('Cargando 5000 reportes lentos...');
for (let i = 0; i < 5000; i++) {
    queue.add(`Rep-${i}`, { message: `This is task number ${i}` }, 1);
}

queue.start();

setTimeout(() => {
    console.log('Cargando 5 reportes urgentes...');
    for (let i = 0; i < 5; i++) {
        queue.add(`Urg-${i}`, { message: `This is an urgent task number ${i}` }, 10);
    }
}, 2000);
