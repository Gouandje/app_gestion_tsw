import { Injectable } from '@nestjs/common';
import { CreateCaisseDto } from './dto/create-caisse.dto';
import { UpdateCaisseDto } from './dto/update-caisse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Caisse, CaisseDocument } from './schemas/caisse.schema';
import { Model } from 'mongoose';

@Injectable()
export class CaisseService {
  
  constructor( 
    @InjectModel(Caisse.name) private readonly caisseModel: Model<CaisseDocument>,
  ){}
  
  async create(createCaisseDto: any) {
    return await this.caisseModel.create(createCaisseDto);
  }

  async findAll() {
    const valuecaise = await this.caisseModel.find().exec();
    return valuecaise;
  }

  findOne(id: string) {
    return `This action returns a #${id} caisse`;
  }

  async update(id: string, updateCaisseDto: any) {
    console.log('update params',id, updateCaisseDto.solde);
    const update = await this.caisseModel.findByIdAndUpdate({_id: id}, updateCaisseDto, {new: true}).lean();
    console.log('updated', update);
    return update
  }

  remove(id: string) {
    return `This action removes a #${id} caisse`;
  }

  async caissebackup() {
    return await this.caisseModel.find().exec();
  }
}
