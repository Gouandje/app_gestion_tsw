import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockPaysService } from './stock-pays.service';
import { CreateStockPaysDto } from './dto/create-stock-pay.dto';
import { UpdateStockPaysDto } from './dto/update-stock-pay.dto';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateStockAlerteEntrepotDto } from 'src/entrepot/dto/create-stock-alerte.dto';
import { UpdateEntrepotDto } from 'src/entrepot/dto/update-entrepot.dto';

@Controller('stockpays')
export class StockPaysController {
  
  constructor(private readonly stockPaysService: StockPaysService) {}

  @Post()
  create(@Body() createStockPaysDto: CreateStockPaysDto) {

    return this.stockPaysService.create(createStockPaysDto);
    
  }

  @Get('stockAllpays')
  findAll() {
    return this.stockPaysService.findAll();
  }

  @Get('stockAllProductpays/:id')
  findAllProductbyCountry(@Param('id') id: string) {
    return this.stockPaysService.findAllproductbycountry(id);
  }

  @Get('stockAllpaysinter')
  findAllinter() {
    return this.stockPaysService.findAllinter();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockPaysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockPaysDto: UpdateStockPaysDto) {
    return this.stockPaysService.update(id, updateStockPaysDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockPaysService.remove(id);
  }

  
}
