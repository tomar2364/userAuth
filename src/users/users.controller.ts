import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './Dto/create-user.dto';
import { Users } from './schemas/user.schema';
import { UsersService } from './users.service';

/**
 * Basic CRUD operations
 */
@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  /**
   * imports UsersService
   * @param usersService This imports UsersService.
   */
  constructor(private userService: UsersService) {}
  /**
   * - all users displayed
   * @returns -This will display all the users data .
   */
  @Get()
  @ApiOkResponse({
    description: 'the resource list has been successfully returened.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  getUsers(@Req() req) {
    return this.userService.getUsers(req.user);
  }
  /**
   * Create new user
   * @returns User data created is returned
   * @example
   * Data added in Database
   * Post : 3000/users
   * displays:
   * id: 5,
   * name: mintu,
   * email: mm@g.com,
   * phone: 1234512345,
   * address: XYZ.
   */
  @Post()
  @ApiCreatedResponse({
    description: 'the resource list has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.userService.createUser(createUserDto, req.user);
  }
  /**
   * User with ID
   * @param{string} id as params
   * @returns user data of params
   * @example
   * User ID as Param
   * 3000/users/5
   */
  @Get('/:id')
  @ApiOkResponse({
    description: 'the resource list has been successfully returened.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  getUserById(@Req() req, @Param('id') id: string): Promise<Users> {
    return this.userService.getUserById(id, req.user);
  }
  /**
   * Delete an user
   * @param{number} id to be deleted
   * @example
   * User if present, deleted
   * Delete: 3000/users/1
   */
  @Delete('/:id')
  @ApiOkResponse({
    description: 'the resource list has been successfully returened.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteUserById(@Param('id') id: string, @Req() req): Promise<void> {
    return this.userService.deleteUserById(id, req.user);
  }
  /**
   * Update user data
   * @param{string} id of user
   * @param{createUserDto} Name to be updated name
   * @returns new user data
   * @example
   * id and status to update
   * PATCH: 3000/users/1
   *
   * Body: Name: "Mintu"
   */
  @Patch('/:id')
  @ApiOkResponse({
    description: 'the resource list has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe)
  updateUserById(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
    @Req() req,
  ): Promise<Users> {
    const { Name } = createUserDto;
    return this.userService.updateUser(id, Name, req.user);
  }
}
