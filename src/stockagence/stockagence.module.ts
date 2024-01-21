import { Module } from '@nestjs/common';
import { StockagenceService } from './stockagence.service';
import { StockagenceController } from './stockagence.controller';
import { Stockagence, StockagenceSchema } from './schemas/stockagence.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AgenceModule } from 'src/angence/agence.module';
import { ProduitModule } from 'src/produit/produit.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { MvtStockagencePays, MvtStockagencePaysSchema } from './schemas/mvtbackpays.schema';

@Module({
  
  imports: [
    ProduitModule,
    AgenceModule, 
    HttpModule,
    StockPaysModule,
    MongooseModule.forFeature(
      [
        { 
          name: Stockagence.name, 
          schema: StockagenceSchema 
        },
        { 
          name: MvtStockagencePays.name, 
          schema: MvtStockagencePaysSchema 
        }
      ]
      )
  ],
  controllers: [StockagenceController],
  providers: [StockagenceService],
  exports: [StockagenceService]
})
export class StockagenceModule {}
