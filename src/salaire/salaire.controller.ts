import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaireService } from './salaire.service';
import { CreateSalaireDto } from './dto/create-salaire.dto';
import { UpdateSalaireDto } from './dto/update-salaire.dto';

@Controller('salaire')
export class SalaireController {
  constructor(private readonly salaireService: SalaireService) {}

  @Post('newsalaire')
  create(@Body() createSalaireDto: CreateSalaireDto) {
    return this.salaireService.create(createSalaireDto);
  }

  @Get('allsalaire/:id')
  findAll(@Param('id') bureauId: string) {
    return this.salaireService.findAll(bureauId);
  }

  @Get('allsalaireca')
  findAllCaZone() {
    return this.salaireService.findAllCa();
  }


  @Get('singlesalaire/:id')
  findOne(@Param('id') id: string) {
    return this.salaireService.findOne(id);
  }

  @Patch('updatesalaire/:id')
  update(@Param('id') id: string, @Body() updateSalaireDto: UpdateSalaireDto) {
    return this.salaireService.update(id, updateSalaireDto);
  }

  @Delete('deletesalaire/:id')
  remove(@Param('id') id: string) {
    return this.salaireService.remove(id);
  }
}
