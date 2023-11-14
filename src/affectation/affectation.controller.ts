import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';

@Controller('affectation')
export class AffectationController {
  
  constructor(private readonly affectationService: AffectationService) {}

  @Post('newaffectation')
  create(@Body() createAffectationDto: CreateAffectationDto) {
    return this.affectationService.create(createAffectationDto);
  }

  @Get('allaffectation')
  findAll() {
    return this.affectationService.findAll();
  }

  @Get('singleaffectation/:id')
  findOne(@Param('id') id: string) {
    return this.affectationService.findOne(id);
  }

  @Get('manager/:id')
  findManager(@Param('id') id: string) {
    return this.affectationService.findManager(id);
  }

  @Patch('updateaffectation/:id')
  update(@Param('id') id: string, @Body() updateAffectationDto: UpdateAffectationDto) {
    return this.affectationService.update(id, updateAffectationDto);
  }

  @Delete('deleteaffectation/:id')
  remove(@Param('id') id: string) {
    return this.affectationService.remove(id);
  }
}
