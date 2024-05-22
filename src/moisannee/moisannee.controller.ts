import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoisanneeService } from './moisannee.service';
import { CreateAnneeDto } from './dto/create-annee.dto';
import { UpdateAnneeDto } from './dto/update-annee.dto';
import { CreateMoisDto } from './dto/create-mois.dto';

@Controller('moisannee')
export class MoisanneeController {
  
  constructor(private readonly moisanneeService: MoisanneeService) {}

  @Post('addyear')
  create(@Body() createMoisanneeDto: CreateAnneeDto) {
    return this.moisanneeService.create(createMoisanneeDto);
  }

  @Get('allyear')
  findAll() {

    return this.moisanneeService.findAll();
  }

  @Get('singleyear/:id')
  findOne(@Param('id') id: string) {
    return this.moisanneeService.findOne(id);
  }


  @Get('singleannee/:annee')
  findOneAnnee(@Param('annee') annee: number) {
    return this.moisanneeService.findOneannee(annee);
  }

  @Get('singlemois/:mois')
  findOneMois(@Param('mois') mois: string) {
    return this.moisanneeService.findOnemois(mois);
  }


  @Post('addmonth')
  createmonth(@Body() createMoisDto: CreateMoisDto) {
    return this.moisanneeService.createmonth(createMoisDto);
  }

  // @Get('ajoutmois')
  // createdirect() {
  //   return this.moisanneeService.createmoisDirect();
  // }

  @Get('allmonth')
  findAllmonth() {
    return this.moisanneeService.findAllMonth();
  }

  @Get('singlemonth/:id')
  findOnemonth(@Param('id') id: string) {
    return this.moisanneeService.findOneMonth(id);
  }

  @Get('currentmonth/:id')
  currentmonth(@Param('id') id: string) {
    return this.moisanneeService.findMonth(id);
  }

  @Get('currentyear/:id')
  currentyear(@Param('id') id: number) {
    return this.moisanneeService.findyear(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnneeDto: UpdateAnneeDto) {
    return this.moisanneeService.update(id, updateAnneeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moisanneeService.remove(id);
  }
}
