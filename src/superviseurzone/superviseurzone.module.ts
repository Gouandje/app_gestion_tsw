import { Module } from '@nestjs/common';
import { SuperviseurzoneService } from './superviseurzone.service';
import { SuperviseurzoneController } from './superviseurzone.controller';
import { ManagerModule } from 'src/manager/manager.module';
import { ZoneModule } from 'src/zone/zone.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Superviseurzone, SuperviseurzoneSchema } from './schemas/superviseurzone.schema';

@Module({
  imports:[
    ManagerModule,
    ZoneModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Superviseurzone.name, 
          schema: SuperviseurzoneSchema 
        }
      ]
      )
  ],
  controllers: [SuperviseurzoneController],
  providers: [SuperviseurzoneService],
  exports: [SuperviseurzoneService]

})
export class SuperviseurzoneModule {}
