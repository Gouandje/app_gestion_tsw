import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTauxDto } from './dto/create-taux.dto';
import { UpdateTauxDto } from './dto/update-taux.dto';
import { Taux, TauxDocument } from './schemas/taux.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class TauxService {

  constructor(
    @InjectModel(Taux.name) private readonly tauxModel: Model<TauxDocument>,
  ) {}
  
  async create(createTauxDto: CreateTauxDto) {
    const taux = await this.tauxModel.find().exec();
    if(taux.length>0){
      throw new NotFoundException('impossible ajouter une de nouvelle valeurs');
    }
      const createdTaux = await this.tauxModel.create(createTauxDto);
    
    return createdTaux;
  }

  async findAll(){
    const taux = await this.tauxModel.find().exec();
    return taux;
  }

  async findOne(id: MongooseSchema.Types.ObjectId): Promise<Taux> {
    const taux = await this.tauxModel.findById(id);
    return taux;
  }

  async update(id: MongooseSchema.Types.ObjectId, updateTauxDto: UpdateTauxDto) {
    const taux = await this.findOne(id);
    const updatedTaux = this.tauxModel.findOneAndUpdate({_id: id }, updateTauxDto, {
      new: true,
    }).exec();


    return updatedTaux;
  }

  async remove(id: string) {
    await this.tauxModel.deleteOne({ _id: id });
    return {};
  }

  async delete(id: string) {
    await this.tauxModel.findByIdAndDelete({ _id: id });
    return {};
  }

  async tauxbackup(){
    return await this.tauxModel.find().exec();
  }
}
