import { Module } from '@nestjs/common';
import { CommisairecontrolService } from './commisairecontrol.service';
import { CommisairecontrolController } from './commisairecontrol.controller';
import { Commisairecontrol, CommisairecontrolSchema } from './schemas/commisairecontrol.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaysModule } from 'src/pays/pays.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PaysModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Commisairecontrol.name, 
          schema: CommisairecontrolSchema 
        },
        
      ]
      )
  ],
  controllers: [CommisairecontrolController],
  providers: [CommisairecontrolService],
  exports: [CommisairecontrolService]
})
export class CommisairecontrolModule {}
