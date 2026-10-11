import * as net from "node:net";
const NODES = [3001, 3002, 3003];

let idx = 0;

const balancer = net.createServer((client: any) => {
    const port = NODES[idx % NODES.length];
    idx++;

    console.log(`Enrutando tráfico -> Puerto ${port}`);
    const node = net.createConnection({ port });

    client.pipe(node);
    node.pipe(client);

    node.on("error", (err: any) => {
        console.error(`Error connecting to node on port ${port}:`, err);
        client.end("error interno del servidor\n");
    });
});

balancer.listen(8080, () => {
    console.log("Balancer listening on port 8080...");
});
