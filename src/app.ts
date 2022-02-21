import express from 'express';
import { User, UserModel } from './user';
import stream from 'stream/promises';
import { createJSONStream } from './jsonStream';

export const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new UserModel(req.body as User);
    await user.save();
    res.sendStatus(200);
});

app.get('/users', async (req, res) => {
    try {
        res.write('[');

        await stream.pipeline(
            UserModel.find().lean().cursor(),
            createJSONStream({ objectMode: true }, function (callback) {
                this.push(']');
                callback();
            }),
            res
        );
    } catch (e) {
        console.log(e);
    }
});
