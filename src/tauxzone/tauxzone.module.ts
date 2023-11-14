import { Module } from '@nestjs/common';
import { TauxzoneService } from './tauxzone.service';
import { TauxzoneController } from './tauxzone.controller';
import { Tauxzone, TauxzoneSchema } from './schemas/tauxzone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ZoneModule } from 'src/zone/zone.module';
import { SectionModule } from 'src/section/section.module';
import { Tauxsection, TauxsectionSchema } from './schemas/tauxsection.schema';

@Module({
  
  imports:[
    ZoneModule,  
    SectionModule,  
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Tauxzone.name, 
          schema: TauxzoneSchema 
        },{
          name: Tauxsection.name,
          schema: TauxsectionSchema
        }
      ]
      )
  ],
  controllers: [TauxzoneController],
  providers: [TauxzoneService],
  exports: [TauxzoneService]
})
export class TauxzoneModule {}
