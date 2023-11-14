import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Role.name, 
          schema: RoleSchema 
        }
      ]
      )
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]

})
export class RoleModule {}
