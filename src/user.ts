import { Schema, model } from 'mongoose';

export interface User {
    name: string;
    email: string;
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

export const UserModel = model<User>('User', schema);
