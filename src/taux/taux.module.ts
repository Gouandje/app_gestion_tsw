import { Module } from '@nestjs/common';
import { TauxService } from './taux.service';
import { TauxController } from './taux.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Taux, TauxSchema } from './schemas/taux.schema';

@Module({
  
  imports: [    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Taux.name, 
          schema: TauxSchema 
        }
      ]
      )
  ],
  controllers: [TauxController],
  providers: [TauxService],
  exports: [TauxService]

})
export class TauxModule {}
