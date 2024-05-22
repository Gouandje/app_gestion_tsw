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

  async findOnemois(mois: string) {
    const month = await this.moisModel.findOne({valueMois: mois});

    if (!month) {
      throw new NotFoundException('mois non trouvée');
    }
    return month;
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

  // async createmoisDirect(){
  //   const data = [
  //     {
      
  //       "valueMois": "janvier",
  //       "codeColor": "#AF002A"
  //     },
      
  //     {
        
  //       "valueMois": "février",
  //       "codeColor": "#72A0C1"
  //     },
      
      
      
  //     {
       
  //       "valueMois": "mars",
  //       "codeColor": "#0048BA"
  //     },
      
      
      
  //     {
  //       "valueMois": "avril",
  //       "codeColor": "#00308F"
  //     },
      
      
      
  //     {
  //       "valueMois": "mai",
  //       "codeColor": "#B284BE"
  //     },
      
      
      
  //     {
  //       "valueMois": "juin",
  //       "codeColor": "#B0BF1A"
  //     },
      
      
      
  //     {
        
  //       "valueMois": "juillet",
  //       "codeColor": "#C9FFE5"
  //     },
      
  //     {
  //       "valueMois": "août",
  //       "codeColor": "#7CB9E8"
  //     },
      
  //     {
       
  //       "valueMois": "septembre",
  //       "codeColor": "#F0F8FF"
  //     },
      
      
      
  //     {
        
  //       "valueMois": "octobre",
  //       "codeColor": "#F2F0E6"
  //     },
      
      
  //     {
        
  //         "valueMois": "novembre",
  //         "codeColor": "#5D8AA8"
  //     },
      
  //     {
        
  //       "valueMois": "décembre",
  //       "codeColor": "#B0BF1A"
  //     }
  // ];
  // for(let i=0; data.length; i++){
  //   await this.moisModel.create(data[i]);
  // }
  // }

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

  async findMonth(valueMois: string) {
    const month = await this.moisModel.findOne({valueMois: valueMois});

    if (!month) {
      throw new NotFoundException('mois non trouvée');
    }
    return month;
  }

  async findyear(value: number) {
    const month = await this.anneeModel.findOne({value: value});

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

  async anneebackup(){
    return await this.anneeModel.find().exec();
  }

  async moisbackup(){
    return await this.moisModel.find().exec();
  }
}
