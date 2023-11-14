import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { AffectationModule } from 'src/affectation/affectation.module';

@Module({
  imports: [    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Manager.name, 
          schema: ManagerSchema 
        }
      ]
    )
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}
