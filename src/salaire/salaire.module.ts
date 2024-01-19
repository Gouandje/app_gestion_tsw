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
import { AffectationModule } from 'src/affectation/affectation.module';
import { SalaireManagerModule } from 'src/salaire_manager/salaire_manager.module';
import { TauxModule } from 'src/taux/taux.module';

@Module({
  imports: [
    HttpModule,
    AgenceModule,
    MouvementstockModule,
    PaysModule,
    MoisanneeModule,
    AffectationModule,
    SalaireManagerModule,
    TauxModule,
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
