import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MvtStockService } from './mvt-stock.service';
import { CreateMvtStocPaysEntrepotkDto } from './dto/create-mvt-stock.dto';
import { UpdateMvtStockDto } from './dto/update-mvt-stock.dto';

@Controller('mvt-stock')
export class MvtStockController {
  constructor(private readonly mvtStockService: MvtStockService) {}

  @Post('mvtstockpaysentrepot')
  create(@Body() createMvtStockDto: CreateMvtStocPaysEntrepotkDto) {
    return this.mvtStockService.create(createMvtStockDto);
  }

  @Get('allmvtstockpaysentrepot')
  findAll() {
    return this.mvtStockService.findAll();
  }

  @Get('singlemvtsotckpaysentrepot/:id')
  findOne(@Param('id') id: string) {
    return this.mvtStockService.findOne(id);
  }

  @Patch('mvtstockpaysentrepot/:id')
  update(@Param('id') id: string, @Body() updateMvtStockDto: UpdateMvtStockDto) {
    return this.mvtStockService.update(id, updateMvtStockDto);
  }

  @Delete('deletemvtstockpaysentre/:id')
  remove(@Param('id') id: string) {
    return this.mvtStockService.remove(id);
  }
}
