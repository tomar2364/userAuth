/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-crediantial.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    signUp: jest.fn(()=> {
      return {};
    }),
    signIn: jest.fn((dto)=>{
      return {
        ...dto
      }
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user',async () => {
    const authdto: AuthCredentialsDto = {
      UserName: 'Mintu',
      password: 'Mintu1214',
    };
    const result = await controller.signUp(authdto);
    expect(result).toEqual({});
  });
  it('should create a user',async () => {
    const authdto: AuthCredentialsDto = {
      UserName: 'Mintu',
      password: 'Mintu1214',
    };
    const result = await controller.signIn(authdto);
    expect(result).toEqual(authdto);
  });
});
