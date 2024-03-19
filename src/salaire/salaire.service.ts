import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaireDto } from './dto/create-salaire.dto';
import { UpdateSalaireDto } from './dto/update-salaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Salaire, SalaireDocument } from './schemas/salaire.schema';
import { Model } from 'mongoose';
import { CreateSalaireManagerDto } from 'src/salaire_manager/dto/create-salaire_manager.dto';
import { SalaireManagerService } from 'src/salaire_manager/salaire_manager.service';
import { AffectationService } from 'src/affectation/affectation.service';
import { TauxService } from 'src/taux/taux.service';

@Injectable()
export class SalaireService {
  constructor(
    @InjectModel(Salaire.name) private readonly salaireModel: Model<SalaireDocument>,
    private readonly salaireManagerservice: SalaireManagerService,
    private readonly affectationservice: AffectationService,
    private readonly tauxservice: TauxService,
    ){}

  async create(createSalaireDto: CreateSalaireDto) {
    const managers = await this.affectationservice.findManager_bureau(createSalaireDto.bureauId);
    const taux = await this.tauxservice.findAll();
    const createdSalairebureau = await this.salaireModel.create(createSalaireDto);
    if(createdSalairebureau){
      
      for(let i= 0; i<managers.length; i++){
        const createSalaireManagerDto = {
          bureauId: createdSalairebureau._id,
          managerId: managers[i].managerId,
          salaireId: createdSalairebureau._id,
          salaire_manager: createSalaireDto.salaire_total_manager/managers.length,
          dette_manager: 0,
          salaire_net_manager: createSalaireDto.salaire_total_manager/managers.length - (createSalaireDto.salaire_total_manager/managers.length)*taux[0].taux_garantie_mgr/100,
          garantie_manager: createSalaireDto.salaire_total_manager/managers.length*taux[0].taux_garantie_mgr/100,
          mois: createSalaireDto.mois,
          annee: createSalaireDto.annee
        }; 
        console.log(createSalaireManagerDto);

        const createsalairemanager = await this.salaireManagerservice.create(createSalaireManagerDto);
        console.log('createsalairemanager',createsalairemanager);
      }
    }
    return createdSalairebureau;
  }

  async findAll(bureauId: string) {
    const salaires = await this.salaireModel.find({bureauId: bureauId}).populate('bureauId').populate('mois').populate('annee').exec();
    return salaires;
  }

  async findAllCa() {
    const salaires = await this.salaireModel
                    .find()
                    .populate('bureauId')
                    .populate('mois')
                    .populate('annee')
                    .exec();
    return salaires;
  }

  async remove(id: string){
    return await this.salaireModel.findByIdAndRemove(id)
  }

  async findsailairebureaumoisannee(bureauId: string, mois: string, annee: string) {
    return  await this.salaireModel.findOne({bureauId: bureauId, mois: mois, annee: annee}).exec();
    // return await this.salaireModel.findByIdAndRemove(salaire._id)
  }


  async findOne(id: string) {
    const salaire = await this.salaireModel.findById(id)
                  .populate('bureauId')
                  .populate('mois')
                  .populate('annee').exec();
    if (!salaire) {
      throw new NotFoundException('non trouvé');
    }
    return salaire;
  }

  update(id: string, updateSalaireDto: UpdateSalaireDto) {
    return this.salaireModel
      .findOneAndUpdate({ id }, updateSalaireDto, {
        new: true,
      })
      .lean();
  }

  async removefindSalaireFordelete(id: string) {
    const salaire = await this.salaireModel.find({bureauId: id}).exec();
    if(salaire !=null){
      for(let i=0; i<salaire.length; i++){
       await this.salaireModel.findByIdAndRemove(id);
      }
    }
    return;
  }

  async salairebackup(){
    return await this.salaireModel.find().exec();
  }
}
