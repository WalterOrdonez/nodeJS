import * as net from "node:net";
import { argv } from "node:process";

const PORT = Number(argv[2]) || 3001;
const NODE_ID = `nodo-${PORT}`;

const server = net.createServer((socket: any) => {
    console.log(`${NODE_ID} connected`);

    setTimeout(() => {
        console.log(`${NODE_ID} Respuesta desde ${NODE_ID}`);
        socket.end();
    }, 500); // Cierra la conexión después de 5 segundos
});

server.listen(PORT, () => {
    console.log(`${NODE_ID} listening...`);
});
