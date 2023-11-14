import { Module } from '@nestjs/common';
import { SalaireService } from './salaire.service';
import { SalaireController } from './salaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Salaire, SalaireSchema } from './schemas/salaire.schema';
import { AgenceModule } from 'src/angence/agence.module';
import { MouvementstockModule } from 'src/mouvementstock/mouvementstock.module';
import { PaysModule } from 'src/pays/pays.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';

@Module({
  imports: [
    HttpModule,
    AgenceModule,
    MouvementstockModule,
    PaysModule,
    MoisanneeModule,
    MongooseModule.forFeature(
      [
        { 
          name: Salaire.name, 
          schema: SalaireSchema 
        }
      ]
      )
  ],
  controllers: [SalaireController],
  providers: [SalaireService],
  exports:[SalaireService]
})
export class SalaireModule {}
