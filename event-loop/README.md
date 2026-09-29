# Event Loop Demo

Small Express server demonstrating fast responses, delayed I/O, and CPU-bound work on the main thread or a worker thread.

## Requirements

- Node.js 20 or newer
- npm

## Run

```sh
npm install
npm start
```

The server listens at `http://localhost:3000`.

## Routes

- `GET /fast`: returns immediately.
- `GET /slow-io`: responds after four seconds.
- `GET /heavy-cpu-block`: runs CPU work on the main thread and blocks other requests.
- `GET /heavy-cpu-worker`: runs the same CPU work in a worker thread.
