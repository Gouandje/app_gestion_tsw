import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockagenceService } from './stockagence.service';
import { CreateStockagenceDto } from './dto/create-stockagence.dto';
import { UpdateStockagenceDto } from './dto/update-stockagence.dto';
import {Schema as MongooseSchema} from 'mongoose';
import { UpdateProductStockagenceDto } from './dto/updateProductStock.dto';
import { MvtStockagencePaysDto } from './dto/mvtstockagencepays.dto';

@Controller('stockagence')
export class StockagenceController {
  
  constructor(private readonly stockagenceService: StockagenceService) {}

  @Post("addstockagence")
  create(@Body() createStockagenceDto: CreateStockagenceDto) {
    return this.stockagenceService.create(createStockagenceDto);
  }

  // @Get("createdirect")
  // createdirecte() {
  //   return this.stockagenceService.directcreate();
  // }

  // @Delete('deletedirecte/:id')
  // removedirecte(@Param('id') id: string) {
  //   return this.stockagenceService.deledirect(id);
  // }

  @Get('allstock/:id')
  findAll(@Param('id') id: string) {
    return this.stockagenceService.findAll(id);
  }

  @Get('allmvtstockforback')
  findAllStockforBack() {
    return this.stockagenceService.findAllMvtAgencePays();
  }

  @Post('createmvtstockagencepays')
  createmvtstockagencepays(@Body() mvtStockagencepaysDto: MvtStockagencePaysDto){
    return this.stockagenceService.mvtStockForBack(mvtStockagencepaysDto)
  }

  @Get('singlestockagence/:id')
  findOne(@Param('id') id: string) {
    return this.stockagenceService.findOne(id);
  }

  @Post('updateBureauProductstoct')
  updateBureauProductstoct(@Body() updateStockagence: UpdateProductStockagenceDto) {
    return this.stockagenceService.updateproduitagentstock(updateStockagence.id, updateStockagence);
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
