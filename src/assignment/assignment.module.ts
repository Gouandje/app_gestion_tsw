import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { AgenceModule } from 'src/angence/agence.module';
import { ManagerModule } from 'src/manager/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Mission, MissionSchema } from './schemas/assignment.schema';

@Module({
  imports: [
    AgenceModule,
    ManagerModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Mission.name, 
          schema: MissionSchema 
        }
      ]
    )
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService]
})
export class AssignmentModule {}
