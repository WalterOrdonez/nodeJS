import * as net from "node:net";

for (let i = 1; i <= 3; i++) {
    const client = net.createConnection({ port: 8080 }, () => {
        console.log(`Client ${i} connected to balancer on port 8080`);
    });
    client.write("ping\n");

    client.on("data", (data) => {
        console.log(`Client ${i} received: ${data.toString()}`);
        client.end();
    });

    client.on("end", () => {
        console.log(`Client ${i} disconnected`);
    });
}
