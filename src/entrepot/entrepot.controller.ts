import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrepotService } from './entrepot.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
import { CreateSortieStockEntrepot } from './dto/create-sortie-stock-entrepot.dto';

@Controller('entrepot')
export class EntrepotController {
  constructor(private readonly entrepotService: EntrepotService) {}

  @Post('newstockentrepot')
  create(@Body() createEntrepotDto: CreateEntrepotDto) {
    return this.entrepotService.create(createEntrepotDto);
  }

  @Post('newsortiestockentrepot')
  createsortiestockentrepot(@Body() createEntrepotDto: CreateSortieStockEntrepot) {
    return this.entrepotService.createSortieEntrepot(createEntrepotDto);
  }

  @Get('allentreestockentrepot')
  findAllEntreeStock() {
    return this.entrepotService.findAll();
  }

  @Get('allstockproduitentrepot')
  findAllStockProductEntrepot() {
    return this.entrepotService.findAllProductStockEntrepot();
  }

  @Get('allSortiestockentrepot')
  findAllSortieStockEntrepot() {
    return this.entrepotService.findAllProductSortieStockEntrepot();
  }
  @Get('alloperationentrepot')
  findAll() {
    return this.entrepotService.findAllOperation();
  }

  @Get('singlestockentrepot/:id')
  findOne(@Param('id') id: string) {
    return this.entrepotService.findOne(id);
  }

  @Patch('updatestockentrepot/:id')
  update(@Param('id') id: string, @Body() updateEntrepotDto: UpdateEntrepotDto) {
    return this.entrepotService.update(id, updateEntrepotDto);
  }

  @Delete('deletestockentrepot/:id')
  remove(@Param('id') id: string) {
    return this.entrepotService.remove(id);
  }
}
