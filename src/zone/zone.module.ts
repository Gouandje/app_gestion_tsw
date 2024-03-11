import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { Zone, ZoneSchema } from './schemas/zone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { PaysModule } from 'src/pays/pays.module';
import { Zoneca, ZonecaSchema } from './schemas/zoneca.schema';
import { Primesz, PrimeszSchema } from './schemas/primesz.schema';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { Zonecamois, ZonecamoisSchema } from './schemas/zonecamois.schema';

@Module({
  
  imports: [
    PaysModule,   
    HttpModule,
    MoisanneeModule,
    MongooseModule.forFeature(
      [
        { 
          name: Zone.name, 
          schema: ZoneSchema 
        },
        { 
          name: Zoneca.name, 
          schema: ZonecaSchema 
        },
        { 
          name: Zonecamois.name, 
          schema: ZonecamoisSchema 
        },
        { 
          name: Primesz.name, 
          schema: PrimeszSchema 
        }
      ]
      )
  ],
  controllers: [ZoneController],
  providers: [ZoneService],
  exports: [ZoneService]

})
export class ZoneModule {}
