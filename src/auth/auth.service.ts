import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './DTO/auth-crediantial.dto';
import { Auth } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  /**
   * userdata and JwtService.
   * @param userdata database schema connection
   * @param jwtService jwtService.
   */
  constructor(
    @InjectModel('Auth')
    private AuthData: Model<Auth>,
    private jwtService: JwtService,
  ) {}
  /**
   * hashpassword
   * @param password user password
   * @param salt salt method
   * @returns incripted password
   */
  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
  /**
   * password validation
   * @param password user password
   * @param salt salt method
   * @returns Returns true if password is correct else false
   */
  private async PasswordValidate(
    password: string,
    salt: string,
    UserPass: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(UserPass, salt);
    return hash === password;
  }
  private async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { UserName, password } = authCredentialsDto;
    const user = await this.AuthData.findOne({ userName: UserName });
    if (
      user &&
      (await this.PasswordValidate(user.password, user.salt, password))
    ) {
      return user.userName;
    } else {
      return null;
    }
  }
  /**
   * SignIn .
   * @param authCredentialsDto username and password
   * @returns Accesstoken
   */
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userName = await this.validateUserPassword(authCredentialsDto);
    if (!userName) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { userName };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
  /**
   * Signup method
   * @param authCredentialsDto username and password DTO.
   * @returns usernames.
   */
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { UserName, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashPass = await this.hashPassword(password, salt);
    const user = new this.AuthData({
      userName: UserName,
      password: hashPass,
      salt: salt,
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new NotFoundException(
          `User with UserName => "${UserName}"already exisit`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
