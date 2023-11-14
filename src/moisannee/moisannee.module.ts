import { Module } from '@nestjs/common';
import { MoisanneeService } from './moisannee.service';
import { MoisanneeController } from './moisannee.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Annee, AnneeSchema } from './schemas/annee.schema';
import { Mois, MoisSchema } from './schemas/mois.schema';

@Module({
  imports: [   
    HttpModule,
    
    MongooseModule.forFeature(
      [
        { 
          name: Annee.name, 
          schema: AnneeSchema 
        },
        {
          name: Mois.name, 
          schema: MoisSchema 
        }
      ]
    )
  ],
  controllers: [MoisanneeController],
  providers: [MoisanneeService],
  exports: [MoisanneeService],
})
export class MoisanneeModule {}
