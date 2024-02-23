import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TauxService } from './taux.service';
import { CreateTauxDto } from './dto/create-taux.dto';
import { UpdateTauxDto } from './dto/update-taux.dto';
import { Schema as MongooseSchema  } from 'mongoose';

@Controller('taux')
export class TauxController {
  
  constructor(private readonly tauxService: TauxService) {}

  @Post('newtaux')
  create(@Body() createTauxDto: CreateTauxDto) {
    return this.tauxService.create(createTauxDto);
  }

  @Get('alltaux')
  findAll() {
    return this.tauxService.findAll();
  }

  @Get('singletaux/:id')
  findOne(@Param('id') id: MongooseSchema.Types.ObjectId) {
    return this.tauxService.findOne(id);
  }

  @Patch('updatetaux/:id')
  update(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateTauxDto: UpdateTauxDto) {
    return this.tauxService.update(id, updateTauxDto);
  }

  // @Delete('deletetaux/:id')
  // remove(@Param('id') id: string) {
  //   return this.tauxService.remove(id);
  // }

  @Delete('deletetaux/:id')
  delete(@Param('id') id: string) {
    return this.tauxService.delete(id);
  }
}
