import { Module } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationController } from './affectation.controller';
import { AgenceModule } from 'src/angence/agence.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Affectation, AffectationSchema } from './schemas/affectation.schema';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [
    AgenceModule,
    ManagerModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Affectation.name, 
          schema: AffectationSchema 
        }
      ]
      )
  ],
  controllers: [AffectationController],
  providers: [AffectationService],
  exports: [AffectationService]

})
export class AffectationModule {}
