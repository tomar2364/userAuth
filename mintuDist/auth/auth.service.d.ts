import { Model } from 'mongoose';
import { AuthCredentialsDto } from './DTO/auth-crediantial.dto';
import { Auth } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private AuthData;
    private jwtService;
    constructor(AuthData: Model<Auth>, jwtService: JwtService);
    private hashPassword;
    private PasswordValidate;
    private validateUserPassword;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
