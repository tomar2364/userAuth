import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://MintuUserDataBase7454:7454939169@cluster0.esxfi.mongodb.net/usersData?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
})
export class AppModule {}
