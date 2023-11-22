import { Module } from '@nestjs/common';
import { MouvementstockService } from './mouvementstock.service';
import { MouvementstockController } from './mouvementstock.controller';
import { Mouvementstock, MouvementstockSchema } from './schemas/mouvementstock.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ProduitModule } from 'src/produit/produit.module';
import { AgenceModule } from 'src/angence/agence.module';
import { StockagenceModule } from 'src/stockagence/stockagence.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { StockModule } from 'src/stock/stock.module';
import { Consignation, ConsignationSchema } from './schemas/consignation.schema';

@Module({
  imports: [
    ProduitModule,
    AgenceModule, 
    StockagenceModule,
    StockPaysModule,
    StockModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Mouvementstock.name, 
          schema: MouvementstockSchema 
        },
        { 
          name: Consignation.name, 
          schema: ConsignationSchema 
        }
      ]
    )],
  controllers: [MouvementstockController],
  providers: [MouvementstockService],
  exports: [MouvementstockService]
})
export class MouvementstockModule {}
