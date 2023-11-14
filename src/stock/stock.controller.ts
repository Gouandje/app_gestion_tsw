import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Schema as MongooseSchema } from 'mongoose';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('newstock')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }
  
  @Get('allstock')
  findAll() {
    return this.stockService.findAll();
  }

  @Get('singlestock/:id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete('deletestock/:id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }

  @Get('singleproduit/:id')
  async findProductDetail(@Param('id') id: MongooseSchema.Types.ObjectId) {
    return await this.stockService.findDetail(id);
  }
}
