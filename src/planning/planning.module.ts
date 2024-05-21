import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { Planning, PlanningSchema } from './schemas/planning.schema';
import { PatientModule } from 'src/patient/patient.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    PatientModule,
    MongooseModule.forFeature(
      [
        { 
          name: Planning.name, 
          schema: PlanningSchema 
        },

      ]
      )
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
