import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}>;
export declare class Users extends mongoose.Document {
    id: string;
    name: string;
    ownerId: string;
}
