import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-crediantial.dto';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signUp(authcredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authcredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
