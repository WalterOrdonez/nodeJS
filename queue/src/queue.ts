class PriorityQueue {
    tasks: { id: string; data: any; priority: number }[];
    isProcessing: boolean;
    constructor() {
        this.tasks = [];
        this.isProcessing = false;
    }

    add(id: string, data: any, priority = 1) {
        this.tasks.push({ id, data, priority });
        this.tasks.sort((a, b) => b.priority - a.priority);
    }

    get length() {
        return this.tasks.length;
    }

    next() {
        return this.tasks.shift();
    }

    start() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this._processLoop();

    }

    _processLoop() {
        if (this.tasks.length === 0) {
            this.isProcessing = false;
            console.log('Cola de tareas vacía. Esperando nuevas tareas...');
            return;
        }

        const task = this.next();

        if (!task) {
            this.isProcessing = false;
            return;
        }

        JSON.stringify(task.data);

        if (task.priority > 5) {
            console.log(`[URGENTE] procesado: ${task.id}`);
        }

        console.log(`Procesado: ${task.id} con prioridad ${task.priority}`);

        setImmediate(() => {
            this._processLoop();
        });
    }
}

export { PriorityQueue };