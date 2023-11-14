import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { HttpModule } from '@nestjs/axios';
import { PaysModule } from 'src/pays/pays.module';

@Module({
  
  imports: [
    PaysModule,    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: User.name, 
          schema: UserSchema 
        }
      ]
      )
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
