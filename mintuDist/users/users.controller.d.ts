import { CreateUserDto } from './Dto/create-user.dto';
import { Users } from './schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(req: any): Promise<{
        id: string;
        name: string;
    }[]>;
    createUser(createUserDto: CreateUserDto, req: any): Promise<string>;
    getUserById(req: any, id: string): Promise<Users>;
    deleteUserById(id: string, req: any): Promise<void>;
    updateUserById(id: string, createUserDto: CreateUserDto, req: any): Promise<Users>;
}
