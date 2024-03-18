import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSuperviseurzoneDto } from './dto/create-superviseurzone.dto';
import { UpdateSuperviseurzoneDto } from './dto/update-superviseurzone.dto';
import { Superviseurzone, SuperviseurzoneDocument } from './schemas/superviseurzone.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SuperviseurzoneService {
  
  constructor(
    @InjectModel(Superviseurzone.name) private readonly superviseurzoneModel: Model<SuperviseurzoneDocument>,
    // private readonly produitService: ProduitService,
    // private readonly paysService: AgenceService
  ){}

  async create(createSuperviseurzoneDto: CreateSuperviseurzoneDto) {
    const alreadyExists = await this.superviseurzoneModel.exists({zoneId: createSuperviseurzoneDto.zoneId, managerId: createSuperviseurzoneDto.managerId }).lean();
    if(alreadyExists){
      throw new ConflictException(`cette zone a déjà un superviseur dans la base de données`);
    }
    const created = await this.superviseurzoneModel.create(createSuperviseurzoneDto);

    if (!created) {
      throw new InternalServerErrorException(
        'Impossible d\'éffectuer cette opération, veuillez réessayer',
      );
    }
    return created;
  }

  async findAll() {
   const superviseurzone = await this.superviseurzoneModel.find().populate('zoneId').populate('managerId').exec();
    return superviseurzone;
  }

  async findOne(id: string) {
    const superzone = await this.superviseurzoneModel
    .find({_id: id})
    .populate('zoneId')
    .populate('managerId')
    .exec();
    
    return superzone;
  }

  async findByZone(id: string) {
    const superzone = await this.superviseurzoneModel
    .find({zoneId: id})
    .populate('zoneId')
    .populate('managerId')
    .exec();
    
    return superzone;
  }

  async update(id: string, updateSuperviseurzoneDto: UpdateSuperviseurzoneDto) {
    const taux = await this.findOne(id);
    const updated = this.superviseurzoneModel.findOneAndUpdate({_id: id }, updateSuperviseurzoneDto, {
      new: true,
    }).exec();


    return updated;
  }

  async remove(id: string) {
    await this.superviseurzoneModel.deleteOne({ _id: id });
    return {};
  }

  async removefordelete(id: string) {
    await this.superviseurzoneModel.findOneAndRemove({ zoneId: id });
    return {};
  }

  async superviserzonebackup(){
    return await this.superviseurzoneModel.find().exec(); 
  }
  
}
