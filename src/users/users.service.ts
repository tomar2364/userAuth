/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { Users } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  /**
   * Userdata keeps info about all users
   * @param userdata database schema connection
   */
  constructor(
    @InjectModel('Users')
    private readonly userdata: Model<Users>,
  ) {}
  /**
   * display all user data
   * @param req user information who is trying to access
   * @returns Returns users
   */
  async getUsers(req) {
    const result = await this.userdata.find().exec();
    const data = await result.filter((prod) => prod.ownerId === req.id );
    return data.map((prod)=> ({id: prod.id, name: prod.name}));
  }
  /**
   * Display specific user data
   * @param id User id as input
   * @param req user information who is trying to access
   * @returns User data of given id
   */
  async getUserById(id: string,req): Promise<Users> {
    const found = await this.userdata.findById(id).where('ownerId').equals(req.id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }
  /**
   * deletes single user
   * @param id id of user
   * @param req user information who is trying to access
   */
  async deleteUserById(id: string,req): Promise<void> {
    await this.getUserById(id,req);
    await this.userdata.deleteOne({id: id}).where('ownerId').equals(req.id);
        
  }
  /**
   * update user data
   * @example
   * Takes user id
   * new name to be changed
   * @returns updated user value
   */
  async updateUser(id: string, Name: string,req): Promise<Users> {
    const user = await this.getUserById(id,req);
    user.name = Name;
    await user.save();
    return user;
  }
  /**
   * create user data
   * @returns id of created user
   */
  async createUser(createUserDto: CreateUserDto,req) {
    const { Name } = createUserDto;
    const user = new this.userdata({name: Name, ownerId: req.id});
    const result = await user.save();
    return result.id;
  }
}
