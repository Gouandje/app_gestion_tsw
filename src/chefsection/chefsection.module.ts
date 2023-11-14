import { Module } from '@nestjs/common';
import { ChefsectionService } from './chefsection.service';
import { ChefsectionController } from './chefsection.controller';
import { Chefsection, ChefsectionSchema } from './schemas/chefsection.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { SectionModule } from 'src/section/section.module';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports:[
    ManagerModule,
    SectionModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Chefsection.name, 
          schema: ChefsectionSchema 
        }
      ]
      )
  ],
  controllers: [ChefsectionController],
  providers: [ChefsectionService],
  exports: [ChefsectionService]
})
export class ChefsectionModule {}
