import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { MachineDto } from './dto/machine.dto';
import { CarnetDto } from './dto/carnet.dto';
import { DemandeDto } from './dto/demande.dto';
import { UpdateSeancePatientKineDto } from './dto/update-seance-kine.dto';
import { CreateSeancePatientKineDto } from './dto/create-seance-kine.dto';
import { FindSalaireDTO } from './dto/findsalaire.dto';
import { SalairekineDTO } from './dto/salairekine.dto';
import { UpdateSoldeKineStatusDTO } from './dto/updatesoldekinestatus.dto';
import { CaKineDTO } from './dto/CaKine.dto';

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

  @Get('allpatientkineEvent/:service')
  findAllPatientkineEvent(@Param('service') service: string) {
    return this.patientService.findAllPatientkineEvent(service);
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


  @Post('createseance')
  createSeance(@Body() createPatientDto: CreateSeancePatientKineDto) {
    return this.patientService.createseance(createPatientDto);
  }


  @Get('allseance/:id')
    findAllSeance(@Param('id') id: string) {
      return this.patientService.findAllpatientkineseance(id);
  }


  @Patch('updateSeance/:id')
  updateSeance(@Param('id') id: string, @Body() updateseancekine: UpdateSeancePatientKineDto) {
      return this.patientService.updateseance(id, updateseancekine);
  }

  @Patch('payerSeance/:id')
  payerSeance(@Param('id') id: string, @Body() updateseancekine: UpdateSeancePatientKineDto) {
      return this.patientService.payerseance(id, updateseancekine);
  }

  @Get('allcakine')
    AllcaKine() {
      return this.patientService.allCaKine();
  }

  @Get('allcakineForCompta')
    AllcaKineForCompta() {
      return this.patientService.allCaKine();
  }

  @Post('singlecakine')
    SinglecaKine(@Body() findsalaireDto: FindSalaireDTO) {
      return this.patientService.CaMoisAnneeKine(findsalaireDto);
  }

 

  @Post('salairekinemoisannee')
    AllsalairemoisKine(@Body() findsalaireDto: FindSalaireDTO) {
      return this.patientService.salaireMoisKine(findsalaireDto);
  }

  @Post('createsalairekine')
  createSalaire(@Body() salairekineDto: SalairekineDTO){
    return this.patientService.createSaliarekine(salairekineDto);
  }

  @Get('allkineSalaire/:id')
  getAllkineSalaire(@Param('id') id: string){
    return this.patientService.allSalaireKine(id);
  }

  @Get('detailkineSalaire/:id')
  getDetailkineSalaire(@Param('id') id: string){
    return this.patientService.detailSalaireKine(id);
  }


  @Patch('updateStatusSoldekine/:id')
  updateStatusSoldekine(@Param('id') id: string, @Body() updatesoldekine: UpdateSoldeKineStatusDTO){
    return this.patientService.updateStatusCaMoisKine(id, updatesoldekine);
  }

  @Delete('deleteseance/:id')
  removeSeance(@Param('id') id: string) {
    return this.patientService.deleteseance(id);
  }

  @Post('createCakine')
    CreateCmoisKine(@Body() cakineDto: CaKineDTO) {
      return this.patientService.CreateCmoisKine(cakineDto);
  }
}
