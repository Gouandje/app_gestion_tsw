import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { AgenceService } from './agence.service';
import { Schema as MongooseSchema } from 'mongoose';

@Controller('agence')
export class AngenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Post('newagence')
  create(@Body() createAgenceDto: CreateAgenceDto) {
    return this.agenceService.create(createAgenceDto);
  }

  @Get('allagence')
  findAll() {
    return this.agenceService.findAll();
  }

  @Get('allagencepays/:id')
  findAllagengeByCountry(@Param('id') id: string) {
    return this.agenceService.findAllagenceByCountry(id);
  }

  @Get('allagencezone/:id')
  findAllagengeByZone(@Param('id') id: string) {
    return this.agenceService.findAllagenceByZone(id);
  }

  @Get('singleagence/:id')
  findOne(@Param('id') id: string) {
    return this.agenceService.findOne(id);
  }

  @Get('siegeagence/:name')
  findSiegeBureau(@Param('name') name: string) {
    return this.agenceService.findSiegeBureau(name);
  }

  @Patch('updadeagence/:bureauid')
  update(@Param('bureauid') bureauid: MongooseSchema.Types.ObjectId, @Body() updateAgenceDto: UpdateAgenceDto) {
    return this.agenceService.update(bureauid, updateAgenceDto);
  }

  @Delete('deleteagence/:id')
  remove(@Param('id') id: string) {
    return this.agenceService.remove(id);
  }
}
