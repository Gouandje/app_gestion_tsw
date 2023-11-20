import { Module } from '@nestjs/common';
import { EntrepotService } from './entrepot.service';
import { EntrepotController } from './entrepot.controller';
import { ProduitModule } from 'src/produit/produit.module';
import { StockModule } from 'src/stock/stock.module';
import { PaysModule } from 'src/pays/pays.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Entrepot, EntrepotSchema } from './schemas/entrepot.schema';
import { EntrepotOperation, EntrepotOperationSchema } from './schemas/entrepotoperation.schema';
import { EntrepotProduitStock, EntrepotProduitStockSchema } from './schemas/entrepotproduitstock.schema';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { SortieProduitEntrepot, SortieProduitEntrepotSchema } from './schemas/sortieproduitentrepot.schema';
import { StockAlerteEntrepot, StockAlerteEntrepotSchema } from './schemas/stockalertentrepot.schema';

@Module({
  imports: [   
    ProduitModule,
    StockModule,
    PaysModule, 
    StockPaysModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Entrepot.name, 
          schema: EntrepotSchema 
        },
        {
          name: EntrepotOperation.name, 
          schema: EntrepotOperationSchema 
        },
        {
          name: EntrepotProduitStock.name, 
          schema: EntrepotProduitStockSchema 
        },
        {
          name: SortieProduitEntrepot.name,
          schema: SortieProduitEntrepotSchema
        },
        {
          name: StockAlerteEntrepot.name,
          schema: StockAlerteEntrepotSchema
        }
      ]
    )
  ],
  controllers: [EntrepotController],
  providers: [EntrepotService],
  exports: [EntrepotService]
})
export class EntrepotModule {}
