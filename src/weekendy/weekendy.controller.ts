import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekendyService } from './weekendy.service';
import { CreateWeekendyDto } from './dto/create-weekendy.dto';
import { UpdateWeekendyDto } from './dto/update-weekendy.dto';
import { Weekendy } from './schemas/weekendy.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateDocteurWeekendyDto } from './dto/create-docteur-weekendy.dto';
import { QueryDto } from './dto/requete.dto';
import { SalairekineDTO } from './dto/salairedoctor.dto';

@Controller('weekendy')
export class WeekendyController {
  
  constructor(private readonly weekendyService: WeekendyService) {}

  @Post('newWeekendy/:id')
  create(@Param('id') id: string, @Body() createWeekendyDto: CreateWeekendyDto){
    // console.log(createWeekendyDto);
    createWeekendyDto.bureauId = id;
    createWeekendyDto.createdAt = Date();
    
    return this.weekendyService.create(createWeekendyDto);
  }

  @Post('newWeekendytsw')
  createVenteDocteur(@Body() createWeekendyDto: CreateDocteurWeekendyDto){
    // console.log(createWeekendyDto);
    createWeekendyDto.createdAt = Date();
    
    return this.weekendyService.createVenteDocteur(createWeekendyDto);
  }

  @Get('suppressiondirecte/:bureauId')
  suppressiondirecte(@Param('bureauId') bureauId: string) {
    
    return this.weekendyService.suppressiondirecte(bureauId);
  }

  @Get('allWeekendydoctor/:bureauId')
  findAllVenteDocteur(@Param('bureauId') bureauId: string) {
    
    return this.weekendyService.findAllVenteDocteur(bureauId);
  }

  @Get('allWeekendy/:bureauId')
  findAll(@Param('bureauId') bureauId: string) {
    return this.weekendyService.findAll(bureauId);
  }

  @Get('allWeekendiesByDoctor/:doctorId')
  findAllWeekendiesbydoctor(@Param('doctorId') doctorId: string){
    return this.weekendyService.findAllVenteByDocteur(doctorId);
  }

  @Get('Weekendies')
  weekendies() {
    return this.weekendyService.weekendybackup();
  }

  @Get('Cacombines')
  getCombinedData() {
      return this.weekendyService.getCombinedData();
  }

  @Get('quantities/:yearId')
  async getGroupedQuantitiesByYear(@Param('yearId') yearId: string) {
    return await this.weekendyService.getGroupedQuantitiesByYear(yearId);
  }

  
  // @Get('allWeekendiesForstock')
  // findWeekendiesForstock() {
  //   return this.weekendyService.weekendiestockagence();
  // }

  // @Get('allWeekendies')
  // findWeekendies() {
  //   return this.weekendyService.findweekendies();
  // }
  @Post('allventepays')
  allGetAllProduitVendyPays(@Body() query: QueryDto) {
    console.log('query',query);
    return this.weekendyService.allGetAllProduitVendyPays(query);
  }

  @Post('createsalairedoctor')
  createSalaireDoctor(@Body() query: SalairekineDTO) {
    console.log('query',query);
    return this.weekendyService.createSalaireDoctor(query);
  }

  @Get('allsalairedoctor/:id')
  allSalairebydoctor(@Param('id') id: string) {
    return this.weekendyService.allGetAllSalaireByDoctor(id);
  }

  @Get('findSingleSalaireByDocteur/:id')
  singleSalaryDoctor(@Param('id') id: string){
    return this.weekendyService.findSigleDoctorSalary(id)
  }


  @Get('singleWeekendy/:id')
  findOne(@Param('id') id: string) {
    return this.weekendyService.findOne(id);
  }

  @Get('findSingleByDocteur/:id')
  findSingleByDocteur(@Param('id') id: string) {
    return this.weekendyService.findSingleByDocteur(id);
  }

  @Patch('updateWeekendy/:id')
  update(@Param('id') id: string, @Body() updateWeekendyDto: UpdateWeekendyDto) {
    return this.weekendyService.update(id, updateWeekendyDto);
  }

  @Delete('deleteWeekendy/:id')
  remove(@Param('id') id: string) {
    return this.weekendyService.remove(id);
  }
}
