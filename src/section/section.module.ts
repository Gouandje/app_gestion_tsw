import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PaysModule } from 'src/pays/pays.module';
import { ZoneModule } from 'src/zone/zone.module';
import { HttpModule } from '@nestjs/axios';
import { Section, SectionSchema } from './schemas/section.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Sectionca, SectioncaSchema } from './schemas/sectionca.schema';
import { Chefsectionprime, ChefsectionprimeSchema } from './schemas/chefsectionprime.schema';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { Sectioncamois, SectioncamoisSchema } from './schemas/sectioncamois.schema';

@Module({
  
  imports: [
    PaysModule,
    ZoneModule,
    HttpModule,
    MoisanneeModule,
    MongooseModule.forFeature(
      [
        { 
          name: Section.name, 
          schema: SectionSchema 
        },
        { 
          name: Sectionca.name, 
          schema: SectioncaSchema 
        },
        { 
          name: Sectioncamois.name, 
          schema: SectioncamoisSchema 
        },
        { 
          name: Chefsectionprime.name, 
          schema: ChefsectionprimeSchema 
        }
      ]
      )
  ],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService]
})
export class SectionModule {}
