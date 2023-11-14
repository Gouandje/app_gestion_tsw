import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schemas/stock.schema';
import { ProduitService } from 'src/produit/produit.service';
import { PaysService } from 'src/pays/pays.service';
import { ProduitModule } from 'src/produit/produit.module';
import { PaysModule } from 'src/pays/pays.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';

@Module({
  imports: [   
    ProduitModule,
    StockPaysModule,
    PaysModule, 
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Stock.name, 
          schema: StockSchema 
        }
      ]
      )
  ],
  controllers: [StockController],
  providers: [StockService],
  exports:[StockService]
})
export class StockModule {}
