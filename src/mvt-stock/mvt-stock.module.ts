import { Module } from '@nestjs/common';
import { MvtStockService } from './mvt-stock.service';
import { MvtStockController } from './mvt-stock.controller';

@Module({
  controllers: [MvtStockController],
  providers: [MvtStockService]
})
export class MvtStockModule {}
