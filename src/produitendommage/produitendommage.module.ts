import { Module } from '@nestjs/common';
import { ProduitendommageService } from './produitendommage.service';
import { ProduitendommageController } from './produitendommage.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Produitendommage, ProduitendommageSchema } from './schemas/produitendommage.schema';
import { ProduitModule } from 'src/produit/produit.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { AgenceModule } from 'src/angence/agence.module';
import { PaysModule } from 'src/pays/pays.module';
import { EntrepotModule } from 'src/entrepot/entrepot.module';
import { PayscaModule } from 'src/paysca/paysca.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { StockagenceModule } from 'src/stockagence/stockagence.module';
import { VenteProduitendommage, VenteProduitendommageSchema } from './schemas/venteproduitendommage.schema';
import { Produitendommagestock, ProduitendommagestockSchema } from './schemas/produitendommagestock.schema';

@Module({
  imports: [    
    HttpModule,
    ProduitModule,
    MoisanneeModule,
    AgenceModule,
    PaysModule,
    EntrepotModule,
    PayscaModule,
    StockPaysModule,
    StockagenceModule,
    MongooseModule.forFeature(
      [
        { 
          name: Produitendommage.name, 
          schema: ProduitendommageSchema 
        },
        { 
          name: VenteProduitendommage.name, 
          schema: VenteProduitendommageSchema 
        },
        { 
          name: Produitendommagestock.name, 
          schema: ProduitendommagestockSchema 
        }
      ]
      )
  ],
  controllers: [ProduitendommageController],
  providers: [ProduitendommageService],
  exports: [ProduitendommageService],
})
export class ProduitendommageModule {}
