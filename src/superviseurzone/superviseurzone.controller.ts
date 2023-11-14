import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuperviseurzoneService } from './superviseurzone.service';
import { CreateSuperviseurzoneDto } from './dto/create-superviseurzone.dto';
import { UpdateSuperviseurzoneDto } from './dto/update-superviseurzone.dto';

@Controller('superviseurzone')
export class SuperviseurzoneController {
  
  constructor(private readonly superviseurzoneService: SuperviseurzoneService) {}

  @Post('addsupertozone')
  create(@Body() createSuperviseurzoneDto: CreateSuperviseurzoneDto) {
    return this.superviseurzoneService.create(createSuperviseurzoneDto);
  }

  @Get('allsuperofzone')
  findAll() {
    return this.superviseurzoneService.findAll();
  }

  @Get('singlesuperzone/:id')
  findOne(@Param('id') id: string) {
    return this.superviseurzoneService.findOne(id);
  }

  @Get('allsupervisorbyzone/:id')
  findByZOne(@Param('id') id: string) {
    return this.superviseurzoneService.findByZone(id);
  }
  

  @Patch('updatesuperzone/:id')
  update(@Param('id') id: string, @Body() updateSuperviseurzoneDto: UpdateSuperviseurzoneDto) {
    return this.superviseurzoneService.update(id, updateSuperviseurzoneDto);
  }

  @Delete('deletedSuperzone/:id')
  remove(@Param('id') id: string) {
    return this.superviseurzoneService.remove(id);
  }
}
