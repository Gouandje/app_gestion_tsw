import { Module } from '@nestjs/common';
import { StockPaysService } from './stock-pays.service';
import { StockPaysController } from './stock-pays.controller';
import { ProduitModule } from 'src/produit/produit.module';
import { PaysModule } from 'src/pays/pays.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { StockPays, StockPaysSchema } from './schemas/stockpays.schema';

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
        }
      ]
      )
  ],
  controllers: [StockPaysController],
  providers: [StockPaysService],
  exports: [StockPaysService]
})
export class StockPaysModule {}
