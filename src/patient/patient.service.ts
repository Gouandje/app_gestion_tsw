import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { Patientkine, PatientkineDocument } from './schemas/patientkine.schema';
import { Patientdoctor, PatientdoctorDocument } from './schemas/patientdoctor.schema';
import { Caissemachine, CaissemachineDocument } from './schemas/caissemachine.schema';
import { Caissemachinesolde, CaissemachinesoldeDocument } from './schemas/caissemachinesolde.schema';
import { Caissekine, CaissekineDocument } from './schemas/caissekine.schema';
import { Caissecarnet, CaissecarnetDocument } from './schemas/caissecarnet.schema';
import { Caissecarnetsolde, CaissecarnetsoldeDocument } from './schemas/caissecarnetsolde.schema';
import { Caissekinesolde } from './schemas/caissekinesolde.schema';
import { MachineDto } from './dto/machine.dto';
import { CarnetDto } from './dto/carnet.dto';
import { DemandeDto } from './dto/demande.dto';
import { Demande, DemandeDocument } from './schemas/demande.schema';
import { Seance, SeanceDocument } from './schemas/seancepatientkine.schema';
import { CreateSeancePatientKineDto } from './dto/create-seance-kine.dto';
import { UpdateSeancePatientKineDto } from './dto/update-seance-kine.dto';
import { FindSalaireDTO } from './dto/findsalaire.dto';
import { SalaireKine, SalaireKineDocument } from './schemas/salairekine.schema';

@Injectable()
export class PatientService {
  private months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<PatientDocument>, 
    @InjectModel(Patientdoctor.name) private readonly patientdoctorModel: Model<PatientdoctorDocument>,

    @InjectModel(Patientkine.name) private readonly patienkineModel: Model<PatientkineDocument>,

    @InjectModel(Caissekine.name) private readonly caissekineModel: Model<CaissekineDocument>,
    @InjectModel(Caissekinesolde.name) private readonly caissekinesoldeModel: Model<CaissemachinesoldeDocument>,

    @InjectModel(Caissemachine.name) private readonly caissemachineModel: Model<CaissemachineDocument>,
    @InjectModel(Caissemachinesolde.name) private readonly caissemachinesoldeModel: Model<CaissemachinesoldeDocument>,

    @InjectModel(Caissecarnet.name) private readonly caissecarnetModel: Model<CaissecarnetDocument>,
    @InjectModel(Caissecarnetsolde.name) private readonly caissecarnetsoldeModel: Model<CaissecarnetsoldeDocument>,
    @InjectModel(Demande.name) private readonly demandeModel: Model<DemandeDocument>,
    @InjectModel(Seance.name) private readonly seanceModel: Model<SeanceDocument>,
    @InjectModel(SalaireKine.name) private readonly salairekineModel: Model<SalaireKineDocument>,

    ){}

  async create(createPatientDto: CreatePatientDto) {
    const createpatient = await this.patientModel.create(createPatientDto);
    if(createpatient){
      if(createPatientDto.service == "kinésithérapie"){
        const createpatienkine = await this.patienkineModel.create(createPatientDto);
        return createpatienkine
      }else{
        const createpatientdoctor = await this.patientdoctorModel.create(createPatientDto);
        return createpatientdoctor;
      }
    }else{
      return {
        message: 'Une erreur s\'est produit lors de l\'enregistrement',
        status: 200
      }
    }

    
  }

  async createMachine(machineDto: MachineDto){
    const created = await this.caissemachineModel.create(machineDto);
    if(created){
      const verifie = await this.caissemachinesoldeModel.findOne({mois: machineDto.mois, annee: machineDto.annee}).exec();
      if(verifie==null){

        const carnet ={
          chiffreAff: machineDto.montant,
          mois: machineDto.mois,
          annee: machineDto.annee
        }
        await this.caissemachinesoldeModel.create(carnet);
      }else{

        const carnet ={
          chiffreAff: machineDto.montant + verifie.chiffreAff,
          mois: machineDto.mois,
          annee: machineDto.annee
        }
        await this.caissemachinesoldeModel.findByIdAndUpdate({_id: verifie._id}, carnet, {new: true}).exec();
      }
      
    }
    return created;

  }

  async createDemande(demandeDto: DemandeDto){
    const created = await this.demandeModel.create(demandeDto);
   
    return created;
  }

  async createCarnet(carnetDto: CarnetDto){
    const created = await this.caissecarnetModel.create(carnetDto);
    if(created){
      const verifie = await this.caissecarnetsoldeModel.findOne({mois: carnetDto.mois, annee: carnetDto.annee}).exec();
      if(verifie==null){

        const carnet ={
          chiffreAff: carnetDto.montant,
          mois: carnetDto.mois,
          annee: carnetDto.annee
        }
        await this.caissecarnetsoldeModel.create(carnet);
      }else{

        const carnet ={
          chiffreAff: carnetDto.montant + verifie.chiffreAff,
          mois: carnetDto.mois,
          annee: carnetDto.annee
        }
        await this.caissecarnetsoldeModel.findByIdAndUpdate({_id: verifie._id}, carnet, {new: true}).exec();
      }
      
    }
    return created;
  }

  async findAll() {
    return await this.patientModel.find().populate('bureauId').exec();
  }

  async findAllCarnet() {
    return await this.caissecarnetModel.find().populate('patientId').exec();
  }

  async findAllDemande() {
    return await this.demandeModel.find().exec();
  }

  async findAllMachine() {
    return await this.caissemachineModel.find().populate('patientId').exec();
  }

  async findAllPatientkine(param: string) {
    const patientkine = await this.patienkineModel.find({service: param}).populate('bureauId').exec();
    return patientkine;
  }

  async findAllPatientkineEvent(param: string) {
    const patients =[];
    const patientkine = await this.patienkineModel.find({service: param}).exec();
    for(let i=0; i<patientkine.length; i++){
      patients.push({
        id: patientkine[i]._id,
        nom: patientkine[i].nom_prenom
      });
    }
    return patients;
  }

  async findAllPatientdoctor(param: string) {
     const result = await this.patientModel.findOne({service: param}).populate('bureauId').exec();
    return result;
  }

  async findOne(id: string) {
    const patient = await this.patientModel.findOne({_id:id}).populate('bureauId').exec();
    return patient;
  }

  async findOneDemande(id: string) {
    const patient = await this.demandeModel.findById(id).populate('bureauId').exec();
    return patient;
  }

  async findOnePatientkine(id: string) {
    const patient = await this.patienkineModel.findById(id).exec();
    return patient;
  }

  async updateDemande(id: string, status: any) {
    const updated = await this.demandeModel.findByIdAndUpdate({_id: id},status, {new: true}).lean()
    return updated;
  }  

  async removeDemande(id: number) {
    await this.demandeModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `demande supprimée`;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const updated = await this.patientModel.findByIdAndUpdate({_id: id},updatePatientDto, {new: true}).lean();
    return updated;
  }

  async remove(id: string) {
    await this.patientModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `manager deleted`;
  }

  async findandDelete(id: string) {
    const patient = await this.patientModel.find({bureauId: id}).exec();
    if(patient !=null){
      for(let i=0; i<patient.length; i++){
        await this.patienkineModel.findByIdAndRemove(patient[i]._id);
      }
    }

    return ;
  }
  
  async createseance(createPatientDto: CreateSeancePatientKineDto) {
    const createpatient = await this.seanceModel.create(createPatientDto);
    if(createpatient.status_paid_seance == 'payé'){
      const date = new Date(createpatient.date_created_seance);
      const caissekineData = {
        patientId: createPatientDto.patientkineId,
        montant: createpatient.cout_seance,
        date: createpatient.date_created_seance,
      };
      await this.caissekineModel.create(caissekineData);
    }
    return {createpatient, status: 200};
  }

  async findAllpatientkineseance(patientkineId:string) {
    const seances =  await this.seanceModel.find({patientkineId:patientkineId}).populate('patientkineId').exec();
    const seance = seances.sort((a, b) =>{
      return a.seance_title.localeCompare(b.seance_title);
    });
    return seance
  }

  async updateseance(id, updateseancekine: UpdateSeancePatientKineDto) {
    const createpatient = await this.seanceModel.findByIdAndUpdate({_id: id},updateseancekine, {new: true}).lean();
    return createpatient;
  }

  async payerseance(id, updateseancekine: UpdateSeancePatientKineDto) {
    console.log(updateseancekine);
    const updatepatient = await this.seanceModel.findByIdAndUpdate({_id: id},updateseancekine, {new: true}).lean();
    console.log(updatepatient);
    if(updatepatient){
      const caissekineData = {
        patientId: updateseancekine.patientkineId,
        montant: updateseancekine.cout_seance,
        date: updateseancekine.date_created_seance,
      };
      await this.caissekineModel.create(caissekineData);
    }
    return updatepatient;
  }

  async comptabiliseSoldeseance(seanceId, start, end){
    const date = new Date(end);
    const monthIndex = date.getMonth(); // Obtenir l'index du mois (0 pour janvier, 11 pour décembre)
    const yearIndex = date.getFullYear(); 
    // Obtenir le 20 du mois en cours
    const currentMonth20th = new Date(date.getFullYear(), date.getMonth(), 20);

    // Obtenir le 20 du mois précédent
    const lastMonth20th = new Date(date.getFullYear(), date.getMonth() - 1, 20);

    // return date >= lastMonth20th && date < currentMonth20th;
    console.log(date, lastMonth20th, currentMonth20th );

    const seance = await this.seanceModel.findById(seanceId).exec();
    if(seance){
      if(date >= lastMonth20th && date < currentMonth20th){
        console.log('mois:', this.months[monthIndex])
        const soldemois = await this.caissekinesoldeModel.findOne({mois: this.months[monthIndex], annee:  yearIndex}).exec();
        console.log(soldemois);
        if(soldemois == null){
          const caItem = {
            chiffreAff: seance.cout_seance,
            mois: this.months[monthIndex],
            annee: yearIndex
          };
  
          return this.caissekinesoldeModel.create(caItem);
  
        }else{
          const caItem = {
            chiffreAff: soldemois.chiffreAff + seance.cout_seance,
            mois: this.months[monthIndex],
            annee: yearIndex
          };
  
          return this.caissekinesoldeModel.findByIdAndUpdate({_id: soldemois._id }, caItem, {new: true}).lean();
  
        }

      }else{
        const soldemois = await this.caissekinesoldeModel.findOne({mois: this.months[monthIndex+1], annee:  yearIndex}).exec();
        if(soldemois == null){
          const caItem = {
            chiffreAff: seance.cout_seance,
            mois: this.months[monthIndex+1],
            annee: yearIndex
          };
  
          return this.caissekinesoldeModel.create(caItem);
  
        }else{
          const caItem = {
            chiffreAff: soldemois.chiffreAff + seance.cout_seance,
            mois: this.months[monthIndex + 1],
            annee: yearIndex
          };
  
          return this.caissekinesoldeModel.findByIdAndUpdate({_id: soldemois._id }, caItem, {new: true}).lean();
  
        }

      }

    }    

  }

  async allCaKine(){
    const cakine = await this.caissekinesoldeModel.find().exec();
    return cakine;
  }

  async CaMoisAnneeKine(findSalaireDto: FindSalaireDTO){
    const camoisannekine = await this.caissekinesoldeModel.findOne({mois:findSalaireDto.mois, annee: findSalaireDto.annee}).exec();
    return camoisannekine;
  }

  async createSaliarekine(salairekineDto){
    return this.salairekineModel.create({mois:salairekineDto.mois, annee: salairekineDto.annee});
  }

  async allSalaireKine(){
    const cakine = await this.salairekineModel.find().exec();
    return cakine;
  }

  async salaireMoisKine(findsalaireDto: FindSalaireDTO){
    const cakine = await this.caissecarnetsoldeModel.findOne({mois:findsalaireDto.mois, annee: findsalaireDto.annee}).exec();
    return cakine;
  }

  async deleteseance(id: string) {
      return await this.seanceModel.findByIdAndRemove(id).exec();
   
  }

  async patientbackup() {
    return await this.patientModel.find().exec();
  }
  async patientdocteurbackup() {
    return await this.patientdoctorModel.find().exec();
  }
  async patientkinebackup() {
    return await this.patienkineModel.find().exec();
  }
  async caissekinebackup() {
    return await this.caissekineModel.find().exec();
  }
  async caissekinesoldebackup() {
    return await this.caissekinesoldeModel.find().exec();
  }
  async caissemachinebackup() {
    return await this.caissemachineModel.find().exec();
  }
  async caissemachinesoldebackup() {
    return await this.caissemachinesoldeModel.find().exec();
  }
  async caissecarnetbackup() {
    return await this.caissecarnetModel.find().exec();
  }
  async caissecarnetsoldebackup() {
    return await this.caissecarnetsoldeModel.find().exec();
  }
  async demandebackup() {
    return await this.demandeModel.find().exec();
  }
  async seancebackup() {
    return await this.seanceModel.find().exec();
  }
  
}
