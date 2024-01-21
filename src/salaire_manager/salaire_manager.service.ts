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

@Injectable()
export class SalaireManagerService {
  
  constructor(@InjectModel(SalaireManager.name) private readonly salaireModel: Model<SalaireManagerDocument>,
  @InjectModel(Cotisation.name) private readonly cotisationModel: Model<CotisationDocument>,
  @InjectModel(CotisationPaye.name) private readonly cotisationpayModel: Model<CotisationPayeDocument>,
  @InjectModel(DetteBureau.name) private readonly dettebureauModel: Model<DetteBureauDocument>,
  private readonly agenceservice: AgenceService,

  ){}

  async create(createSalaireManagerDto) {

    const alreadyExists = await this.salaireModel.findOne({managerId:createSalaireManagerDto.managerId, salaireId: createSalaireManagerDto.salaireId }).lean();
    if(alreadyExists !=null){
      console.log('type de alreadyExists', typeof alreadyExists);
      return this.findAllBymanagerAndSalary(createSalaireManagerDto.managerId, createSalaireManagerDto.salaireId);    
    }else{
      
      const createdSalairemanager = await this.salaireModel.create(createSalaireManagerDto);

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
    const salairesManager = await this.salaireModel
                    .find({managerId: managerId})
                    .populate('managerId')
                    .populate('salaireId')
                    .exec();
    return salairesManager;
  }

  async findAllManagersalaireBySalaireId(salaireId: string) {
    const salairesManager = await this.salaireModel
                    .find({salaireId: salaireId})
                    .populate('managerId')
                    .populate('salaireId')
                    .exec();
    return salairesManager;
  }

  async findAllBymanagerAndSalary(managerId: string, salaireId: string) {
    const salairesManager = await this.salaireModel
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
      const findsalairemanager = await this.salaireModel.find({salaireId: detteBureaudto.salaireId});
      console.log('findsalairemanager',findsalairemanager);
      for(let i=0; i<findsalairemanager.length; i++){
        const updateData: UpdateSalaireManagerDto = {
          salaire_manager:findsalairemanager[i].salaire_manager,
          dette_manager:findsalairemanager[i].dette_manager,
          garantie_manager:findsalairemanager[i].garantie_manager,
          mois:findsalairemanager[i].mois,
          annee:findsalairemanager[i].annee,
          managerId: findsalairemanager[i].managerId,
          salaireId: findsalairemanager[i].salaireId,
          salaire_net_manager: findsalairemanager[i].salaire_net_manager - detteBureaudto.montantdette/findsalairemanager.length
        };
        console.log('updateValue',updateData);

        const updated = this.salaireModel.findOneAndReplace({_id: findsalairemanager[i]._id}, updateData).exec();
        console.log('updated',updated);

      }
    
      return {status: 200, message: 'enregistrer avec succès'};
    }   
    

  }

  async getDetteBureau(salaireId){
    const dettebureau = await this.dettebureauModel
                    .find({salaireId: salaireId})
                    .exec();
    return dettebureau;                
  }

  async findAllCotisationManager(managerId: string) {
    const cotisation: any[] = [];
    const salairesManager = await this.salaireModel
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
    const salairesManager = await this.salaireModel
                    .find({mois: mois})
                    .populate('managerId')
                    .exec();
    return salairesManager;
  }

  async findOne(id: string) {
    const salairemanager = await this.salaireModel.find({managerId:id})
                  .populate('managerId').exec();
    if (!salairemanager) {
      throw new NotFoundException('salaire du mois non trouvé');
    }
    return salairemanager;
  }

  async update(id: string, updateDetteDto: UpdateDetteDto) {
   
    const salaire = await this.salaireModel.findOne({ salaireId: id, managerId: updateDetteDto.managerId });


    const updateddata = {
      salaire_net_manager: updateDetteDto.salaire_net_manager,
      salaire_manager: salaire.salaire_manager,
      managerId: updateDetteDto.managerId,
      alaireId: id,
      dette_manager: updateDetteDto.dette_manager,
      mois: updateDetteDto.mois,
      annee: updateDetteDto.annee,

    };

    return this.salaireModel.findOneAndUpdate({_id: salaire._id }, updateddata, {
      new: true,
    }).lean();
  }
  

  // async remove(id: number) {
  //   await this.salaireModel.deleteOne({ _id: id });
  //   return {};
  // }

  async remove(id: string){
    return await this.salaireModel.findByIdAndRemove(id)
  }

  async findsailairemanager(salaireId: string) {
    
    const salairemanager=  await this.salaireModel.findOne({salaireId: salaireId}).exec();
    const getcotisation = await this.cotisationModel.findOne({managerId: salairemanager.managerId}).exec(); 
    const updatecotisation = {
      managerId: salairemanager.managerId,
      cotisation_totale: getcotisation.cotisation_totale -  salairemanager.garantie_manager,
      statut: "impayé"
    };
    const updated =  await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();
    if(updated){
      await this.cotisationModel.findByIdAndUpdate({_id: getcotisation._id},updatecotisation, { new: true,} ).lean();
      return await this.salaireModel.findByIdAndRemove(salairemanager._id)
    }
    
  }
}
