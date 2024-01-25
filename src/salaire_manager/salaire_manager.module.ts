import { Module } from '@nestjs/common';
import { SalaireManagerService } from './salaire_manager.service';
import { SalaireManagerController } from './salaire_manager.controller';
import { SalaireManager, SalaireManagerSchema } from './schemas/salaire_manager.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ManagerModule } from 'src/manager/manager.module';
import { SalaireModule } from 'src/salaire/salaire.module';
import { Cotisation, CotisationSchema } from './schemas/cotisation.schema';
import { AgenceModule } from 'src/angence/agence.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { CotisationPaye, CotisationPayeSchema } from './schemas/cotisation_paye.schema';
import { DetteBureau, DetteBureauSchema } from './schemas/dette_bureau.schema';
import { Remboursement, RemboursementSchema } from './schemas/remboursement.schema';

@Module({
  imports: [   
    // SalaireModule,
    AgenceModule,
    ManagerModule, 
    HttpModule,
    MoisanneeModule,
    MongooseModule.forFeature(
      [
      
        { 
          name: SalaireManager.name, 
          schema: SalaireManagerSchema 
        },
        { 
          name: Cotisation.name, 
          schema: CotisationSchema 
        },
        {
          name:CotisationPaye.name,
          schema:CotisationPayeSchema
        },
        {
          name:DetteBureau.name,
          schema:DetteBureauSchema
        },
        {
          name:Remboursement.name,
          schema:RemboursementSchema
        }
      ]
      )
  ],
  controllers: [SalaireManagerController],
  providers: [SalaireManagerService],
  exports: [SalaireManagerService]
})
export class SalaireManagerModule {}
