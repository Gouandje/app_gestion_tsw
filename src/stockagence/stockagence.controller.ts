import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockagenceService } from './stockagence.service';
import { CreateStockagenceDto } from './dto/create-stockagence.dto';
import { UpdateStockagenceDto } from './dto/update-stockagence.dto';
import {Schema as MongooseSchema} from 'mongoose';

@Controller('stockagence')
export class StockagenceController {
  constructor(private readonly stockagenceService: StockagenceService) {}

  @Post("addstockagence")
  create(@Body() createStockagenceDto: CreateStockagenceDto) {
    return this.stockagenceService.create(createStockagenceDto);
  }

  @Get('allstock/:id')
  findAll(@Param('id') id: string) {
    return this.stockagenceService.findAll(id);
  }

  @Get('singlestockagence/:id')
  findOne(@Param('id') id: string) {
    return this.stockagenceService.findOne(id);
  }

  @Patch('updatestockagence/:id')
  update(@Param('id') id: string, @Body() updateStockagenceDto: UpdateStockagenceDto) {
    return this.stockagenceService.update(id, updateStockagenceDto);
  }

  @Delete('deletestockagence/:id')
  remove(@Param('id') id: string) {
    return this.stockagenceService.remove(id);
  }
}
