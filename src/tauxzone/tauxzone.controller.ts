import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TauxzoneService } from './tauxzone.service';
import { CreateTauxzoneDto } from './dto/create-tauxzone.dto';
import { UpdateTauxzoneDto } from './dto/update-tauxzone.dto';
import { CreateTauxsectionDto } from './dto/create-tauxsection.dto';
import { UpdateTauxsectionDto } from './dto/update-tauxsection.dto';

@Controller('tauxzone')
export class TauxzoneController {
  
  constructor(private readonly tauxzoneService: TauxzoneService) {}

  @Post('createTauxZone')
  create(@Body() createTauxzoneDto: CreateTauxzoneDto) {
    return this.tauxzoneService.create(createTauxzoneDto);
  }

  @Get('allTauxzone')
  findAll() {
    return this.tauxzoneService.findAll();
  }

  @Get('singleTauxZone/:id')
  findOne(@Param('id') id: string) {
    return this.tauxzoneService.findOne(id);
  }

  @Get('singleTauxByZone/:id')
  findByZone(@Param('id') id: string) {
    return this.tauxzoneService.findByzone(id);
  }

  @Patch('updateTauxZone/:id')
  update(@Param('id') id: string, @Body() updateTauxzoneDto: UpdateTauxzoneDto) {
    return this.tauxzoneService.update(id, updateTauxzoneDto);
  }

  @Delete('deleteTauxZone/:id')
  remove(@Param('id') id: string) {
    return this.tauxzoneService.delete(id);
  }

  // tauxsection

  @Post('createTauxSection')
  createSection(@Body() createTauxsectionDto: CreateTauxsectionDto) {
    return this.tauxzoneService.createsection(createTauxsectionDto);
  }

  @Get('allTauxSection')
  findAllSection() {
    return this.tauxzoneService.findAllSection();
  }

  @Get('singleTauxSection/:id')
  findOneSection(@Param('id') id: string) {
    return this.tauxzoneService.findOneSection(id);
  }

  @Get('singleTauxBySection/:id')
  findBySection(@Param('id') id: string) {
    return this.tauxzoneService.findBysection(id);
  }

  @Patch('updateTauxSection/:id')
  updatesection(@Param('id') id: string, @Body() updateTauxsectionDto: UpdateTauxsectionDto) {
    return this.tauxzoneService.updatesection(id, updateTauxsectionDto);
  }

  @Delete('deleteTauxSection/:id')
  removesection(@Param('id') id: string) {
    return this.tauxzoneService.removesection(id);
  }
}
