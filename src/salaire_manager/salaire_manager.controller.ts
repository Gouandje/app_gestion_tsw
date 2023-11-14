import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaireManagerService } from './salaire_manager.service';
import { CreateSalaireManagerDto } from './dto/create-salaire_manager.dto';
import { UpdateSalaireManagerDto } from './dto/update-salaire_manager.dto';
import { HydratedDocument, Schema as MongooseSchema  } from "mongoose";
import { UpdateDetteDto } from './dto/update-dette.dto';

@Controller('salaire-manager')
export class SalaireManagerController {
  constructor(private readonly salaireManagerService: SalaireManagerService) {}

  @Post('addsalaireManager')
  create(@Body() createSalaireManagerDto: CreateSalaireManagerDto) {
    return this.salaireManagerService.create(createSalaireManagerDto);
  }

  @Get('allSalaireManager/:managerId')
  findAll(@Param('managerId') managerId: string) {
    return this.salaireManagerService.findAll(managerId);
  }

  @Get('getsalairemanager/:salaireId')
  findAllManagerSalaire(@Param('salaireId') salaireId: string) {
    return this.salaireManagerService.findAllManagersalaireBySalaireId(salaireId);
  }


  @Get('allCotisationManager/:managerId')
  findAllcotisatin(@Param('managerId') managerId: string) {
    return this.salaireManagerService.findAllCotisationManager(managerId);
  }

  @Get('allCotisationTotaleManager/:managerId')
  findAllcotisatinTotale(@Param('managerId') managerId: string) {
    return this.salaireManagerService.findAllCotisationTotaleManager(managerId);
  }

  @Get('allSalaireManagermois/:mois')
  findAllMois(@Param('mois') mois: string) {
    return this.salaireManagerService.findAllmois(mois);
  }

  @Get('singleManagersalaire/:id')
  findOne(@Param('id') id: string) {
    return this.salaireManagerService.findOne(id);
  }

  @Patch('updateSalaireManager/:id')
  update(@Param('id') id: string, @Body() updateDetteDto: UpdateDetteDto) {
    return this.salaireManagerService.update(id, updateDetteDto);
  }

  @Delete('deletesalairemanager/:id')
  remove(@Param('id') id: string) {
    return this.salaireManagerService.remove(+id);
  }
}
