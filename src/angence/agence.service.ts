import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AgenceDocument, Agence } from './schemas/agence.schema';
import { Model, Schema as MongooseSchema } from 'mongoose';


@Injectable()
export class AgenceService {
  constructor(
    @InjectModel(Agence.name) private readonly agenceModel: Model<AgenceDocument>,
  ) {}

  async create(createAgenceDto: CreateAgenceDto): Promise<Agence> {
    const alreadyExists = await this.agenceModel.exists({ name: createAgenceDto.bureau_name }).lean();
    if(alreadyExists){
      throw new ConflictException(`cet produit existe déjà dans la base de données`);
    }
  
    const createdAgence = await this.agenceModel.create(createAgenceDto);

    if (!createdAgence) {
      throw new InternalServerErrorException(
        'Impossible de créer le produit, veuillez réessayer',
      );
    }
    return createdAgence;
  }

  async findAll(): Promise<Agence[]> {
    const agences = await this.agenceModel.find()
                              .populate('countryId')
                              .populate('zoneId')
                              .populate('sectionId')
                              .exec();
    return agences;
  }

  async findAllagenceByCountry(id: string){
    const agences = await this.agenceModel.find({countryId: id})
                              .populate('countryId')
                              .populate('zoneId')
                              .populate('sectionId')
                              .exec();
    return agences;
  }

  async findAllagenceCountry(id: string){
    const agences = await this.agenceModel.find({countryId: id}).exec();
    return agences;
  }

  async findAllagenceByZone(id: string): Promise<Agence[]> {
    const agences = await this.agenceModel.find({zoneId: id})
                              .populate('countryId')
                              .populate('zoneId')
                              .populate('sectionId')
                              .exec();
    return agences;
  }

  async findAllagenceZone(id: string) {
    const agences = await this.agenceModel.find({zoneId: id}).exec();
    return agences;
  }

  async findAllagenceSection(id: string) {
    const agences = await this.agenceModel.find({sectionId: id}).exec();
    return agences;
  }

  async findOne(bureauId: string) {
    const agence = await this.agenceModel.findById(bureauId)
                                         .populate('countryId')
                                         .populate('zoneId')
                                         .populate('sectionId')
                                         .exec();
    if (!agence) {
      throw new NotFoundException('agence non trouvée');
    }
    return agence;
  }

  async findbureau(bureauId: string) {
    const agence = await this.agenceModel.findOne({_id: bureauId}).exec();
    return agence;
  }

  async findSiegeBureau(name: string) {
    const agence = await this.agenceModel.findOne({bureau_name: name})
                                         .populate('countryId')
                                         .populate('zoneId')
                                         .populate('sectionId')
                                         .exec();

    if (!agence) {
      throw new NotFoundException('agence non trouvée');
    }
    return agence;
  }

  async findSingleAgengence(bureauId: string){
    const agence = await this.agenceModel.findById(bureauId).exec();
   return agence;
  }

  async update(bureauId: MongooseSchema.Types.ObjectId, updateAgenceDto: UpdateAgenceDto) {
    const agency: Agence = await this.agenceModel
      .findByIdAndUpdate(bureauId, { $set: updateAgenceDto }, { new: true })
      .exec();
    if (!agency) {
      throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
    }
    return agency;
  }

  async remove(bureauId: string) {
    console.log('bureauId', bureauId);
    await this.agenceModel.findByIdAndRemove(bureauId).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return {message: 'bureau supprimé avec succès'};

  }
}
