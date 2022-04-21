import { Model } from 'mongoose';
import { JwtPayload } from './jwt-payload.interface';
import { Auth } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private AuthData;
    constructor(AuthData: Model<Auth>);
    validate(payload: JwtPayload): Promise<Auth>;
}
export {};
