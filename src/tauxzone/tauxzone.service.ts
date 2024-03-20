import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTauxzoneDto } from './dto/create-tauxzone.dto';
import { UpdateTauxzoneDto } from './dto/update-tauxzone.dto';
import { Tauxzone, TauxzoneDocument } from './schemas/tauxzone.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTauxsectionDto } from './dto/create-tauxsection.dto';
import { UpdateTauxsectionDto } from './dto/update-tauxsection.dto';
import { Tauxsection, TauxsectionDocument } from './schemas/tauxsection.schema';

@Injectable()
export class TauxzoneService {
  
  constructor(
    @InjectModel(Tauxzone.name) private readonly tauxzoneModel: Model<TauxzoneDocument>,
    @InjectModel(Tauxsection.name) private readonly tauxsectionModel: Model<TauxsectionDocument>,
  ){}

  async create(createTauxzoneDto: CreateTauxzoneDto) {
    const alreadyExists = await this.tauxzoneModel.exists({ zoneId: createTauxzoneDto.zoneId }).lean();
    if(alreadyExists){
      throw new ConflictException(`cette existe déjà dans la base de données`);
    }
    const createdTauxzone = await this.tauxzoneModel.create(createTauxzoneDto);
    return createdTauxzone;
  }

  async findAll() {
    const tauxzone = await this.tauxzoneModel
    .find()
    .populate('zoneId')
    .exec();
return tauxzone;
  }

  async findByzone(id: string) {
    const taux = await this.tauxzoneModel.findOne({zoneId: id})
                  .populate('zoneId').exec();
    if (!taux) {
      throw new NotFoundException('taux de zone non trouvée' +`${id}`);
    }
    return taux;
  }

  async findOne(id: string) {
    const taux = await this.tauxzoneModel.findById(id);

    if (!taux) {
      throw new NotFoundException('taux non trouvée');
    }
    return taux;
  }

  async update(id: string, updateTauxzoneDto: UpdateTauxzoneDto) {
    // const tauzone = await this.findOne(id);

    const taux = this.tauxzoneModel.findOneAndUpdate({_id: id }, updateTauxzoneDto, {
      new: true,
    }).exec();


    return taux;
  }

  async remove(id: string) {
    await this.tauxzoneModel.deleteOne({ _id: id });
    return {};
  }

  async delete(id: string){
    return await this.tauxzoneModel.findByIdAndRemove(id);
  }

  // section service bloc

  async createsection(createTauxsectionDto: CreateTauxsectionDto) {
    const alreadyExists = await this.tauxsectionModel.exists({ sectionId: createTauxsectionDto.sectionId }).lean();
    if(alreadyExists){
      throw new ConflictException(`cette existe déjà dans la base de données`);
    }
    const createdTauxsection = await this.tauxsectionModel.create(createTauxsectionDto);
    return createdTauxsection;
  }

  async findAllSection() {
    const tauxsection = await this.tauxsectionModel
    .find()
    .populate('zoneId')
    .populate('sectionId')
    .exec();
return tauxsection;
  }

  async findBysection(id: string) {
    const taux = await this.tauxsectionModel.findOne({sectionId:id})
                  .populate('zoneId').populate('sectionId').exec();
    if (!taux) {
      throw new NotFoundException('section non trouvée');
    }
    return taux;
  }

  async findOneSection(id: string) {
    const taux = await this.tauxsectionModel.findOne({sectionId:id}).populate('zoneId').populate('sectionId').exec();

    if (!taux) {
      throw new NotFoundException('taux non trouvée');
    }
    return taux;
  }

  async updatesection(id: string, updateTauxsectionDto: UpdateTauxsectionDto) {
    // const tauzone = await this.findOne(id);

    const taux = this.tauxsectionModel.findOneAndUpdate({_id: id }, updateTauxsectionDto, {
      new: true,
    }).exec();


    return taux;
  }


  async removesection(id: string) {
    await this.tauxzoneModel.deleteOne({ _id: id });
    return {};
  }

  async tauzonebackup(){
    return await this.tauxzoneModel.find().exec();
  }

  async tausectionbackup(){
    return await this.tauxsectionModel.find().exec();
  }
}
