import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnneeDto } from './dto/create-annee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Annee, AnneeDocument } from './schemas/annee.schema';
import { Model } from 'mongoose';
import { Mois, MoisDocument } from './schemas/mois.schema';
import { CreateMoisDto } from './dto/create-mois.dto';
import { UpdateAnneeDto } from './dto/update-annee.dto';

@Injectable()
export class MoisanneeService {

  
  constructor(
    @InjectModel(Annee.name) private readonly anneeModel: Model<AnneeDocument>, 
    @InjectModel(Mois.name) private readonly moisModel: Model<MoisDocument>){}

  async create(createAnneeDto: CreateAnneeDto) {
    const alreadyExists = await this.anneeModel.exists({ annee: createAnneeDto.annee}).lean();
    if(alreadyExists){
      throw new ConflictException(`cette année existe déjà dans la base de données`);
    }
    const createyear = await this.anneeModel.create(createAnneeDto);
    return createyear;
  }

  async findAll() {
    const years = await this.anneeModel.find().exec();
    return years;
  }

  async findOne(id: string) {
    const year = await this.anneeModel.findById(id);

    if (!year) {
      throw new NotFoundException('année non trouvée');
    }
    return year;
  }

  async findOneannee(annee) {
    const year = await this.anneeModel.findOne({annee: annee});

    if (!year) {
      throw new NotFoundException('année non trouvée');
    }
    return year;
  }

  async createmonth(createMoisDto: CreateMoisDto) {
    const alreadyExists = await this.moisModel.exists({valueMois: createMoisDto.valueMois}).lean();
    if(alreadyExists){
      throw new ConflictException(`cet mois existe déjà dans la base de données`);
    }else{
      const createmonth = await this.moisModel.create(createMoisDto);
      return createmonth;
    }

  }

  async findAllMonth() {
    const months = await this.moisModel.find().exec();
    return months;
  }

  async findOneMonth(id: string) {
    const month = await this.moisModel.findById(id);

    if (!month) {
      throw new NotFoundException('mois non trouvée');
    }
    return month;
  }

  update(id: string, updateAnneeDto: UpdateAnneeDto) {
    return `This action updates a #${id} moisannee`;
  }

  remove(id: string) {
    return `This action removes a #${id} moisannee`;
  }
}
