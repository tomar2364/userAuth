import { CreateUserDto } from './Dto/create-user.dto';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userdata;
    constructor(userdata: Model<Users>);
    getUsers(req: any): Promise<{
        id: string;
        name: string;
    }[]>;
    getUserById(id: string, req: any): Promise<Users>;
    deleteUserById(id: string, req: any): Promise<void>;
    updateUser(id: string, Name: string, req: any): Promise<Users>;
    createUser(createUserDto: CreateUserDto, req: any): Promise<string>;
}
