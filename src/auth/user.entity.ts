/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const AuthSchema = new mongoose.Schema({
    userName: { type: String, unique: true, require: true},
    password: { type: String, require: true},
    salt: {type: String, require: false},
});

export class Auth extends mongoose.Document {
    id: string;
    userName: string;
    password: string;
    salt: string;
}
