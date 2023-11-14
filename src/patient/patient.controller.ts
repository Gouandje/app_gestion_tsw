import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { MachineDto } from './dto/machine.dto';
import { CarnetDto } from './dto/carnet.dto';
import { DemandeDto } from './dto/demande.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  
  @Post('newpatient')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post('newmachine')
  createMachine(@Body() machineDto: MachineDto) {
    return this.patientService.createMachine(machineDto);
  }

  @Post('newcarnet')
  createCarnet(@Body() carnetDto: CarnetDto) {
    console.log('carnetDto',carnetDto);
    return this.patientService.createCarnet(carnetDto);
  }

  @Get('allpatient')
  findAll() {
    return this.patientService.findAll();
  }

  @Get('allcarnet')
  findAllCarnet() {
    return this.patientService.findAllCarnet();
  }
  @Get('allmachine')
  findAllMachine() {
    return this.patientService.findAllMachine();
  }

  @Get('allpatientkine/:service')
  findAllPatientkine(@Param('service') service: string) {
    return this.patientService.findAllPatientkine(service);
  }

  @Get('allpatientdoctor/:service')
  findAllPatientdoctor(@Param('service') service: string) {
    return this.patientService.findAllPatientdoctor(service);
  }

  @Get('singlepatient/:id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch('updatepatient/:id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete('deletepatient/:id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }


  @Post('newdemande')
  createDemande(@Body() demandeDto: DemandeDto) {
    return this.patientService.createDemande(demandeDto);
  }
  @Get('alldemande')
    findAllDemande() {
      return this.patientService.findAllDemande();
    }

  @Get('singledemande/:id')
  findOneDemande(@Param('id') id: string) {
    return this.patientService.findOneDemande(id);
  }

  @Get('singlepatientkine/:id')
  findOnePatientkine(@Param('id') id: string) {
    return this.patientService.findOnePatientkine(id);
  }

 @Patch('changestatusdemande/:id')
  updateDemande(@Param('id') id: string, @Body() status: any) {
    return this.patientService.updateDemande(id, status);
  }

  @Delete('deletedemande/:id')
  removeDemande(@Param('id') id: string) {
    return this.patientService.removeDemande(+id);
  }
}
