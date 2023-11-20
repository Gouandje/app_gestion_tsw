import { Module } from '@nestjs/common';
import { StockPaysService } from './stock-pays.service';
import { StockPaysController } from './stock-pays.controller';
import { ProduitModule } from 'src/produit/produit.module';
import { PaysModule } from 'src/pays/pays.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { StockPays, StockPaysSchema } from './schemas/stockpays.schema';
import { PaysStockAlert, PaysStockAlertSchema } from './schemas/stockalertpays.schema';
import { StockAlertPaysController } from './stockalert.controller';
import { StockAlertPaysService } from './stockalert.service';

@Module({
  
  imports: [   
    ProduitModule,
    PaysModule, 
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: StockPays.name, 
          schema: StockPaysSchema 
        },
        { 
          name: PaysStockAlert.name, 
          schema: PaysStockAlertSchema 
        }
      ]
      )
  ],
  controllers: [StockPaysController,StockAlertPaysController],
  providers: [StockPaysService,StockAlertPaysService],
  exports: [StockPaysService,StockAlertPaysService]
})
export class StockPaysModule {}
