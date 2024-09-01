import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommisairecontrolDto } from './dto/create-commisairecontrol.dto';
import { UpdateCommisairecontrolDto } from './dto/update-commisairecontrol.dto';
import { Commisairecontrol, CommisairecontrolDocument } from './schemas/commisairecontrol.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommisairecontrolService {
    @InjectModel(Commisairecontrol.name) private readonly commissaireModel: Model<CommisairecontrolDocument>
    constructor(){}

  async create(createCommisairecontrolDto: CreateCommisairecontrolDto) {
    const alreadyExists = await this.commissaireModel.exists({ telephone: createCommisairecontrolDto.telephone, nom: createCommisairecontrolDto.nom, prenom: createCommisairecontrolDto.prenom, codeAgent: createCommisairecontrolDto.codeAgent }).lean();
    if(alreadyExists){
      throw new ConflictException(`ce commissiare de contrôle existe déjà dans la base de données`);
    }
    const createdManager = await this.commissaireModel.create(createCommisairecontrolDto);

    if (!createdManager) {
      throw new InternalServerErrorException(
        'Impossible de créer le commissaire de contrôle, veuillez réessayer',
      );
    }
    return createdManager;
  }

  async findAll() {
    const commissaires = await this.commissaireModel.find().exec();
    return commissaires;
  }

  async findOne(id: string) {
    const commissaire = await this.commissaireModel.findById(id);
    if (!commissaire) {
      throw new NotFoundException('commissaire de contrôle non trouvée');
    }
    return commissaire;
  }

  async update(id: string, updateCommisairecontrolDto: UpdateCommisairecontrolDto) {
    const commissaire = await this.commissaireModel
    .findByIdAndUpdate(id, { $set: updateCommisairecontrolDto }, { new: true })
    .exec();
    if (!commissaire) {
      throw new NotFoundException(`The commissaire de contrôle non trouvé.`);
    }
    return commissaire;
  }

  async remove(id: string) {
    const deleted = await this.commissaireModel.findByIdAndRemove(id).exec();
    if(deleted){
      return {
        status: 200, 
        message: 'supprimé avec succès'
      };
    }else{
      throw new NotFoundException(`Soit contrôleur n'est pas trouvé soit échec de suppression.`);

    }
  }
}
