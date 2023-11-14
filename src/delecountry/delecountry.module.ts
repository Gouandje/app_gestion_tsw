import { Module } from '@nestjs/common';
import { DelecountryService } from './delecountry.service';
import { DelecountryController } from './delecountry.controller';
import { PaysModule } from 'src/pays/pays.module';
import { ZoneModule } from 'src/zone/zone.module';
import { SectionModule } from 'src/section/section.module';
import { AgenceModule } from 'src/angence/agence.module';
import { StockModule } from 'src/stock/stock.module';
import { EntrepotModule } from 'src/entrepot/entrepot.module';
import { MouvementstockModule } from 'src/mouvementstock/mouvementstock.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { WeekendyModule } from 'src/weekendy/weekendy.module';
import { SalaireModule } from 'src/salaire/salaire.module';
import { PayscaModule } from 'src/paysca/paysca.module';
import { StockagenceModule } from 'src/stockagence/stockagence.module';
import { AffectationModule } from 'src/affectation/affectation.module';
import { SuperviseurzoneModule } from 'src/superviseurzone/superviseurzone.module';
import { PatientModule } from 'src/patient/patient.module';
import { ChefsectionModule } from 'src/chefsection/chefsection.module';

@Module({
  imports:[
    PaysModule,
    ZoneModule,
    SectionModule,
    AgenceModule,
    StockModule,
    EntrepotModule,
    MouvementstockModule,
    StockPaysModule,
    WeekendyModule,
    SalaireModule,
    PayscaModule,
    StockagenceModule,
    AffectationModule,
    SuperviseurzoneModule,
    PatientModule,
    ChefsectionModule
  ],
  controllers: [DelecountryController],
  providers: [DelecountryService]
})
export class DelecountryModule {}
