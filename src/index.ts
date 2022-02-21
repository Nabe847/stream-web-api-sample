import { app } from './app';
import { connect } from 'mongoose';

async function run(): Promise<void> {
    await connect('mongodb://localhost:37017/test');
    const port = 8080;

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

run().catch((e) => console.log(e));
