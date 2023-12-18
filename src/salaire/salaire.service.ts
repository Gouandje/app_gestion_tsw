import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaireDto } from './dto/create-salaire.dto';
import { UpdateSalaireDto } from './dto/update-salaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Salaire, SalaireDocument } from './schemas/salaire.schema';
import { Model } from 'mongoose';

@Injectable()
export class SalaireService {
  constructor(@InjectModel(Salaire.name) private readonly salaireModel: Model<SalaireDocument>){}

  async create(createSalaireDto: CreateSalaireDto) {

    const createdSalairebureau = await this.salaireModel.create(createSalaireDto);
    return createdSalairebureau;
  }

  async findAll(bureauId: string) {
    const salaires = await this.salaireModel
                    .find({bureauId: bureauId})
                    .populate('bureauId')
                    .populate('mois')
                    .populate('annee')
                    .exec();
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
}
