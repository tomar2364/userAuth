/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: String,
});

export class Users extends mongoose.Document {
    id: string;
    name: string;
    ownerId: string;
}
// export class TestUser {
//     id: string;
//     name: string;
//     ownerId: string;
// }