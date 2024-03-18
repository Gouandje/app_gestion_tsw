import { Module } from '@nestjs/common';
import { MvtStockService } from './mvt-stock.service';
import { MvtStockController } from './mvt-stock.controller';
import { StockModule } from 'src/stock/stock.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { PaysModule } from 'src/pays/pays.module';
import { EntrepotModule } from 'src/entrepot/entrepot.module';
import { MvtStockPaysEntrepot, MvtStockPaysEntrepotSchema } from './schemas/mvt-stock.schema';

@Module({
  imports:[
    StockModule,
    PaysModule, 
    EntrepotModule,
    StockPaysModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: MvtStockPaysEntrepot.name, 
          schema: MvtStockPaysEntrepotSchema 
        }
       
      ]
    )

  ],
  controllers: [MvtStockController],
  providers: [MvtStockService],
  exports: [MvtStockService]
})
export class MvtStockModule {}
