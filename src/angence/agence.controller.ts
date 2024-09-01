import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { AgenceService } from './agence.service';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateAgenceLocationDto } from './dto/agence-location.dto';
import { UpdateAgenceLocationDto } from './dto/update-agence-location.dto';

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

  @Get('updatedirect')
  updatedirect() {
    return this.agenceService.updateDirect();
  }

  @Get('allagences')
  findAllForMvt() {
    return this.agenceService.findAllForMvt();
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
  update(@Param('bureauid') bureauid: string, @Body() updateAgenceDto: UpdateAgenceDto) {
    return this.agenceService.update(bureauid, updateAgenceDto);
  }

  @Delete('deleteagence/:id')
  remove(@Param('id') id: string) {
    return this.agenceService.remove(id);
  }

  @Post('newAgenceLocation')
  createAgenceLocation(@Body() createAgenceLocationDto: CreateAgenceLocationDto) {
    return this.agenceService.createAngenceLocation(createAgenceLocationDto);
  }

  @Get('singleagencelocation/:id')
  findSingleBureauLocation(@Param('id') id: string) {
    return this.agenceService.findSingleBureauLocation(id);
  }

  @Patch('updadeagencelocation/:bureaulocationid')
  updateagencelocation(@Param('bureaulocationid') bureaulocationid: string, @Body() updateAgencelocationDto: UpdateAgenceLocationDto) {
    return this.agenceService.updateagencelocation(bureaulocationid, updateAgencelocationDto);
  }

  @Delete('deleteagencelocation/:id')
  removeagencelocation(@Param('id') id: string) {
    return this.agenceService.removeagencelocation(id);
  }

  @Get('allagencelocation')
  findAllAgenceLocation() {
    return this.agenceService.findAllAgenceLocation();
  }

}
