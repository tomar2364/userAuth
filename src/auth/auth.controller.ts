/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-crediantial.dto';
/**
 * Authentication routes such as signin, signup are present in this class
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /**
   * We import Auth Service
   * @param authService importing is done this way
   */
  constructor(private authservice: AuthService) {}
  @ApiOperation({
    summary: 'SignUp Route',
    description:
      'New user is created and put in database - herein postgres',
  })
  @ApiCreatedResponse({
    description: 'Signup complete',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  /**
   * TNew users are added using auth service
   * @example
   * Use the following format to insert username and password
   * username: 'Mintu',
   * password: 'Mintu123456'
   */
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto) {
    return this.authservice.signUp(authcredentialsDto);
  }
  /**
   * Signin using the following format:
   * @example
   * Using existing data
   * userName: 'Mintu',
   * password: 'Mintu123456'
   * @returns AccessToken
   */
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authservice.signIn(authcredentialsDto);
  }
}
