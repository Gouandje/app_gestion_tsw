import { Module } from '@nestjs/common';
import { CaisseService } from './caisse.service';
import { CaisseController } from './caisse.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Caisse, CaisseSchema } from './schemas/caisse.schema';

@Module({
  
  imports:[
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Caisse.name, 
          schema: CaisseSchema 
        }
      ]
      )
  ],
  controllers: [CaisseController],
  providers: [CaisseService],
  exports: [CaisseService]
})
export class CaisseModule {}
