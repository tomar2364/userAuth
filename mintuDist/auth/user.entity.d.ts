import * as mongoose from 'mongoose';
export declare const AuthSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}>;
export declare class Auth extends mongoose.Document {
    id: string;
    userName: string;
    password: string;
    salt: string;
}
