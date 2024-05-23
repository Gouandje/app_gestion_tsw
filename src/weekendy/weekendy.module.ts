import { Module } from '@nestjs/common';
import { WeekendyService } from './weekendy.service';
import { WeekendyController } from './weekendy.controller';
import { ProduitModule } from 'src/produit/produit.module';
import { AgenceModule } from 'src/angence/agence.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Weekendy, WeekendySchema } from './schemas/weekendy.schema';
import { StockagenceModule } from 'src/stockagence/stockagence.module';
import { SalaireModule } from 'src/salaire/salaire.module';
import { AffectationModule } from 'src/affectation/affectation.module';
import { WeekendyDocteur, WeekendyDocteurSchema } from './schemas/weekendydocteur.schema';
import { PayscaModule } from 'src/paysca/paysca.module';
import { Produitvendubureau, ProduitvendubureauSchema } from './schemas/produitvendubureau.schema';
import { Produitvendupays, ProduitvendupaysSchema } from './schemas/produitsvendupays.schema';
import { TauxModule } from 'src/taux/taux.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { TauxzoneModule } from 'src/tauxzone/tauxzone.module';
import { ZoneModule } from 'src/zone/zone.module';
import { SectionModule } from 'src/section/section.module';
import { SalaireManagerModule } from 'src/salaire_manager/salaire_manager.module';
import { SalaireDoctor, SalaireDoctorSchema } from './schemas/salairedoctor.schema';

@Module({
  
  imports: [
    ProduitModule,
    AgenceModule, 
    StockagenceModule,
    MoisanneeModule,
    AffectationModule,
    HttpModule,
    SalaireModule,
    SalaireManagerModule,
    PayscaModule,
    TauxModule,
    TauxzoneModule,
    ZoneModule,
    SectionModule,
    MongooseModule.forFeature(
      [
        { 
          name: Weekendy.name, 
          schema: WeekendySchema 
        },
        { 
          name: WeekendyDocteur.name, 
          schema: WeekendyDocteurSchema 
        },
        { 
          name: Produitvendubureau.name, 
          schema: ProduitvendubureauSchema 
        },
        { 
          name: Produitvendupays.name, 
          schema: ProduitvendupaysSchema 
        },

        { 
          name: SalaireDoctor.name, 
          schema: SalaireDoctorSchema 
        },
        
      ]
      )
  ],
  controllers: [WeekendyController],
  providers: [WeekendyService],
  exports: [WeekendyService]

})
export class WeekendyModule {}
