/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
// import { AuthCredentialsDto } from 'src/auth/DTO/auth-crediantial.dto';
// const httpMocks = require('node-mocks-http');
describe('UserService', () => {
  
  const mockAuthService = {};
  let userService: UsersService;
  let userController: UsersController;
  let authService: AuthService;

  const mockRequest = {
    user: {
      Name: 'Mintu',
      id: '1',

    },
  };

  const mockFeedPost: CreateUserDto = {
    Name: 'mintu',
  };

  // const mockFeedPosts: CreateUserDto[] = [
  //   mockFeedPost,
  //   { ...mockFeedPost, Name: 'second feed post' },
  //   { ...mockFeedPost, Name: 'third feed post' },
  // ];
  // const mockuserData = {
  //   id: '1',
  //   userName: 'MintuK',
  //   password: 'bquwfuqenneof',
  //   salt: 'jnaecbecnvae',

  // };
  

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    updateUser: jest.fn().mockImplementation(() => {
      return {};
    }),
    getUsers: jest.fn(() => {
      return {
        id: expect.any(Number),
        Name: 'Mintu',
      };
    }),
    getUserById: jest.fn(() => {
      return {
        id: expect.any(Number),
        Name: 'Mintu',
      };
    }),
    deleteUserById: jest.fn().mockImplementation(() => {
      return {};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: AuthGuard, useValue: jest.fn().mockImplementation( ()=> true ) },
        { provide: UseGuards, useValue: jest.fn().mockImplementation( ()=> true ) },

      ],
    }).overrideProvider(UsersService).useValue(mockUserService).compile();
    userService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should create a user',async () => {
    expect(await userController.createUser(mockFeedPost,mockRequest)).toEqual(
      {
        id: expect.any(Number),
        ...mockFeedPost,
      }
    );
    
  });
  it('should get all the user',async () => {
    const sub = await userController.getUsers(mockRequest);
    expect(sub).toEqual({
      Name: 'Mintu',
      id: expect.any(Number),
    });
  });
  it('should delete the user by id',async () => {
    const sub = await userController.deleteUserById('1',mockRequest);
    expect(sub).toEqual({});
  });
  it('should get user by id',async () => {
    const sub = await userController.getUserById(mockRequest,'1');
    expect(sub).toEqual({
      Name: 'Mintu',
      id: expect.any(Number),
    });
  });
  it('should get user by id',async () => {
    const sub = await userController.getUserById(mockRequest,'2');
    expect(sub).toEqual({
      Name: 'Mintu',
      id: expect.any(Number),
    });
  });
  it('should get user by id',async () => {
    const sub = await userController.getUserById(mockRequest,'1');
    expect(sub).toEqual({
      Name: 'Mintu',
      id: expect.any(Number),
    });
  });
  it('should get user by id',async () => {
    const sub = await userController.getUserById(mockRequest,'3');
    expect(sub).toEqual({
      Name: 'Mintu',
      id: expect.any(Number),
    });
  });
  it('should update the user by id',async () => {
    const sub = await userController.updateUserById('1',mockFeedPost,mockRequest);
    expect(sub).toEqual({});
  });
  

  

   
});