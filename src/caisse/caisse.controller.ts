import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaisseService } from './caisse.service';
import { CreateCaisseDto } from './dto/create-caisse.dto';
import { UpdateCaisseDto } from './dto/update-caisse.dto';

@Controller('caisse')
export class CaisseController {
  
  constructor(private readonly caisseService: CaisseService) {}

  @Get('solde')
  findAll() {
    return this.caisseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caisseService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caisseService.remove(id);
  }
}
