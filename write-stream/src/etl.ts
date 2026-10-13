import { Transform } from 'stream';

class formateadorCSV extends Transform {
    _transform(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null, data?: any) => void): void {
        let dataTexto = chunk.toString();
        let dataMutada = dataTexto.replace(/,/g, ' | ');

        this.push(dataMutada);
        callback();
    }
}

export { formateadorCSV };