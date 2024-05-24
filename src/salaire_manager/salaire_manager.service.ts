import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaireManagerDto } from './dto/create-salaire_manager.dto';
import { UpdateSalaireManagerDto } from './dto/update-salaire_manager.dto';
import { SalaireManager, SalaireManagerDocument } from './schemas/salaire_manager.schema';
import { SalaireDocument } from 'src/salaire/schemas/salaire.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateDetteDto } from './dto/update-dette.dto';
import { Cotisation, CotisationDocument } from './schemas/cotisation.schema';
import { AgenceService } from 'src/angence/agence.service';
import { CotisationPaye, CotisationPayeDocument } from './schemas/cotisation_paye.schema';
import { CreatecotisationpayDto } from './dto/create-cotisationpay.dto';
import { DetteBureauDto } from './dto/dette_bureau.dto';
import { DetteBureau, DetteBureauDocument } from './schemas/dette_bureau.schema';
import { RemboursementDto } from './dto/remboursement.dto';
import { Remboursement, RemboursementDocument } from './schemas/remboursement.schema';
import { ManagerService } from 'src/manager/manager.service';

@Injectable()
export class SalaireManagerService {
  
  constructor(
    @InjectModel(SalaireManager.name) private readonly salairemanagerModel: Model<SalaireManagerDocument>,
    @InjectModel(Cotisation.name) private readonly cotisationModel: Model<CotisationDocument>,
    @InjectModel(CotisationPaye.name) private readonly cotisationpayModel: Model<CotisationPayeDocument>,
    @InjectModel(DetteBureau.name) private readonly dettebureauModel: Model<DetteBureauDocument>,
    @InjectModel(Remboursement.name) private readonly remboursementModel: Model<RemboursementDocument>,
  private readonly agenceservice: AgenceService,
  private readonly managerservice: ManagerService,

  ){}

  async create(createSalaireManagerDto) {

    const alreadyExists = await this.salairemanagerModel.findOne({managerId:createSalaireManagerDto.managerId, salaireId: createSalaireManagerDto.salaireId }).lean();
    if(alreadyExists !=null){
      console.log('type de alreadyExists', typeof alreadyExists);
      return this.findAllBymanagerAndSalary(createSalaireManagerDto.managerId, createSalaireManagerDto.salaireId);    
    }else{
      
      const createdSalairemanager = await this.salairemanagerModel.create(createSalaireManagerDto);

      if(createSalaireManagerDto){
        const getcotisation = await this.cotisationModel.findOne({managerId: createSalaireManagerDto.managerId}).exec();
        if(getcotisation == null){
          const createcotisation = {
            managerId: createSalaireManagerDto.managerId,
            cotisation_totale: createSalaireManagerDto.garantie_manager,
            statut: "impayé"
          };
          await this.cotisationModel.create(createcotisation);
        }else{
          const updatecotisation = {
            managerId: createSalaireManagerDto.managerId,
            cotisation_totale: getcotisation.cotisation_totale +  createSalaireManagerDto.garantie_manager,
            statut: "impayé"
          };
          await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();
        }
        
      }
      return createdSalairemanager;

    }
    
  }

  async createCotisationpay(createcotisationpayDto: CreatecotisationpayDto){

    const createdpay = await this.cotisationpayModel.create(createcotisationpayDto)
    if(createdpay){
      const getcotisation = await this.cotisationModel.findOne({managerId: createcotisationpayDto.managerId}).exec();
      
      if(getcotisation !=null){
        const updatecotisation = {
          managerId: createcotisationpayDto.managerId,
          cotisation_totale: createcotisationpayDto.cotisation_totale,
          statut: "payé"
        };
        await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();

      }
      

    }
    
  }

  async findAll(managerId: string) {
    const salairesManager = await this.salairemanagerModel
                    .find({managerId: managerId})
                    .populate('managerId')
                    .populate('salaireId')
                    .exec();
    return salairesManager;
  }

  async findAllManagersalaireBySalaireId(salaireId: string) {
    const salairesManager = await this.salairemanagerModel
                    .find({salaireId: salaireId})
                    .populate('managerId')
                    .populate('salaireId')
                    .exec();
   
    return salairesManager;
  }

  async findAllBymanagerAndSalary(managerId: string, salaireId: string) {
    const salairesManager = await this.salairemanagerModel
                    .find({managerId: managerId, salaireId:salaireId})
                    .populate('managerId')
                    .populate('salaireId')
                    .exec();
      // console.log(salairesManager);           
    return salairesManager;
  }

  async findAllCotisationTotaleManager(managerId: string){

    const cotisationtotale = await this.cotisationModel
                    .findOne({managerId: managerId})
                    .exec();
    return cotisationtotale;

  }

  async createDetteBureau(detteBureaudto: DetteBureauDto){

    const created = await this.dettebureauModel.create(detteBureaudto)
    if(created){
      // const findsalairemanager = await this.salairemanagerModel.find({salaireId: detteBureaudto.salaireId});
      // for(let i=0; i<findsalairemanager.length; i++){
      //   const updateData: UpdateSalaireManagerDto = {
      //     salaire_manager:findsalairemanager[i].salaire_manager,
      //     dette_manager:findsalairemanager[i].dette_manager,
      //     garantie_manager:findsalairemanager[i].garantie_manager,
      //     mois:findsalairemanager[i].mois,
      //     annee:findsalairemanager[i].annee,
      //     managerId: findsalairemanager[i].managerId,
      //     salaireId: findsalairemanager[i].salaireId,
      //     salaire_net_manager: findsalairemanager[i].salaire_net_manager - Math.round(detteBureaudto.montantdette/findsalairemanager.length)
      //   };
      //   const updated = await this.salairemanagerModel.findByIdAndUpdate({_id: findsalairemanager[i]._id}, {$set: updateData }, { new: true }).exec();

      //   // const updated = await this.salairemanagerModel.findByIdAndUpdate(findsalairemanager[i]._id, {$set: updateData}, {new: true, }).lean();
      //   // console.log(updated);
      //   // const updated = this.salairemanagerModel.findByIdAndUpdate(findsalairemanager[i]._id, {$set: updateData}, {new: true}).lean();

      // }
    
      return {status: 200, message: 'enregistrer avec succès'};
    }   
    

  }

  async createRemboursementBureau(remboursementdto: RemboursementDto){

    const created = await this.remboursementModel.create(remboursementdto)
    return {status: 200, created, message: 'enregistrer avec succès'};
    // if(created){
    //   const findsalairemanager = await this.salairemanagerModel.find({salaireId: remboursementdto.salaireId});
    //   for(let i=0; i<findsalairemanager.length; i++){
    //     const updateData: UpdateSalaireManagerDto = {
    //       salaire_manager:findsalairemanager[i].salaire_manager,
    //       dette_manager:findsalairemanager[i].dette_manager,
    //       garantie_manager:findsalairemanager[i].garantie_manager,
    //       mois:findsalairemanager[i].mois,
    //       annee:findsalairemanager[i].annee,
    //       managerId: findsalairemanager[i].managerId,
    //       salaireId: findsalairemanager[i].salaireId,
    //       salaire_net_manager: findsalairemanager[i].salaire_net_manager + Math.round(remboursementdto.montantajout/findsalairemanager.length)
    //     };

    //     const updated = await this.salairemanagerModel.findByIdAndUpdate(findsalairemanager[i]._id, {$set: updateData}, {new: true, }).lean();
    //   }
    
    //   return {status: 200, message: 'enregistrer avec succès'};
    // }   
    

  }

  async getDetteBureau(salaireId){
    const dettebureau = await this.dettebureauModel
                    .find({salaireId: salaireId})
                    .exec();
    return dettebureau;                
  }

  async getRemboursement(salaireId){
    const remboursement = await this.remboursementModel
                    .find({salaireId: salaireId})
                    .exec();
    return remboursement;                
  }

  async findAllCotisationManager(managerId: string) {
    const cotisation: any[] = [];
    const salairesManager = await this.salairemanagerModel
                    .find({managerId: managerId})
                    .populate('managerId')
                    .populate('salaireId')
                    .populate('mois')
                    .populate('annee')
                    .exec();
    // console.log(salairesManager);                
    for(let i=0; i<salairesManager.length; i++){
      // console.log(salairesManager[i].salaireId["bureauId"].toString('hex'));
      const bureau = await this.agenceservice.findbureau(salairesManager[i].salaireId["bureauId"].toString('hex'));
      // console.log('bureau', bureau);
      const obj={
        bureau: bureau.bureau_name,
        managerId:salairesManager[i].managerId,
        chiffreaffaire: salairesManager[i].salaireId["chiffreDaf"],
        salaire: salairesManager[i].salaire_manager,
        cotisation: salairesManager[i].garantie_manager,
        mois: salairesManager[i].mois,
        annee: salairesManager[i].annee,
        
      };
      cotisation.push(obj);

    }                
    return cotisation;
  }

  async findAllmois(mois: string) {
    console.log('mois',mois);
    const salairesManager = await this.salairemanagerModel
                    .find({mois: mois})
                    .populate('managerId')
                    .exec();
    return salairesManager;
  }

  async findOne(id: string) {
    const salairemanager = await this.salairemanagerModel.find({managerId:id})
                  .populate('managerId').exec();
    if (!salairemanager) {
      throw new NotFoundException('salaire du mois non trouvé');
    }
    return salairemanager;
  }

  async update(id: string, updateDetteDto: UpdateDetteDto) {
   
    const salaire = await this.salairemanagerModel.findOne({ salaireId: id, managerId: updateDetteDto.managerId });


    const updateddata = {
      salaire_net_manager: updateDetteDto.salaire_net_manager,
      salaire_manager: salaire.salaire_manager,
      managerId: updateDetteDto.managerId,
      alaireId: id,
      dette_manager: updateDetteDto.dette_manager,
      mois: updateDetteDto.mois,
      annee: updateDetteDto.annee,

    };

    return this.salairemanagerModel.findOneAndUpdate({_id: salaire._id }, updateddata, {
      new: true,
    }).lean();
  }
  

  // async remove(id: number) {
  //   await this.salairemanagerModel.deleteOne({ _id: id });
  //   return {};
  // }

  async remove(id: string){
    return await this.salairemanagerModel.findByIdAndRemove(id)
  }

  async findsailairemanager(salaireId: string) {
    
    const salairemanager=  await this.salairemanagerModel.findOne({salaireId: salaireId}).exec();
    const getcotisation = await this.cotisationModel.findOne({managerId: salairemanager.managerId}).exec(); 
    const updatecotisation = {
      managerId: salairemanager.managerId,
      cotisation_totale: getcotisation.cotisation_totale -  salairemanager.garantie_manager,
      statut: "impayé"
    };
    const updated =  await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();
    if(updated){
      await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();
      return await this.salairemanagerModel.findByIdAndRemove(salairemanager._id)
    }
    
  }


  async salairemanagerbackup(){
    return await this.salairemanagerModel.find().exec();
   }
   
   async cotisationbackup(){
    return await this.cotisationModel.find().exec();
   }

   async cotisationpayebackup(){
    return await this.cotisationpayModel.find().exec();
   }

   async dettebureaubackup(){
    return await this.dettebureauModel.find().exec();
   }

   async remboursementbackup(){
    return await this.remboursementModel.find().exec();
   }
}
