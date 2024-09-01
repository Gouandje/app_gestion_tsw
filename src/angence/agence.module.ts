import { Module } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { AngenceController } from './agence.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Agence, AgenceSchema } from './schemas/agence.schema';
import { PaysModule } from 'src/pays/pays.module';
import { ZoneModule } from 'src/zone/zone.module';
import { SectionModule } from 'src/section/section.module';
import { LocationAgence, LocationAgenceSchema } from './schemas/locationagence.schema';

@Module({
  
  imports: [
    PaysModule,
    ZoneModule,
    SectionModule,    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Agence.name, 
          schema: AgenceSchema 
        },
        {
          name: LocationAgence.name,
          schema: LocationAgenceSchema
        }
      ]
      )
  ],
  controllers: [AngenceController],
  providers: [AgenceService],
  exports: [AgenceService]
})
export class AgenceModule {}
