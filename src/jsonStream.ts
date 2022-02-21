import stream, { Transform } from 'stream';
import through2 from 'through2';
import { User } from './user';

export function createJSONStream(opts?: stream.DuplexOptions, flush?: through2.FlushCallback): stream.Transform {
    let isFirstLine = true;
    const transform = function (this: Transform, chunk: User, enc: BufferEncoding, callback: through2.TransformCallback): void {
        // this.emit('error', new Error());

        const json = JSON.stringify({
            name: chunk.name,
            mail: chunk.email,
        });

        if (isFirstLine) {
            this.push(json);
            isFirstLine = false;
            return callback();
        }

        this.push(',' + json);
        callback();
    };

    return through2(opts, transform, flush);
}
