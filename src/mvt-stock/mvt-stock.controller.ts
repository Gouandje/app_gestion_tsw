import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MvtStockService } from './mvt-stock.service';
import { CreateMvtStockDto } from './dto/create-mvt-stock.dto';
import { UpdateMvtStockDto } from './dto/update-mvt-stock.dto';

@Controller('mvt-stock')
export class MvtStockController {
  constructor(private readonly mvtStockService: MvtStockService) {}

  @Post()
  create(@Body() createMvtStockDto: CreateMvtStockDto) {
    return this.mvtStockService.create(createMvtStockDto);
  }

  @Get()
  findAll() {
    return this.mvtStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mvtStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMvtStockDto: UpdateMvtStockDto) {
    return this.mvtStockService.update(+id, updateMvtStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mvtStockService.remove(+id);
  }
}
