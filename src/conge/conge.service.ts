import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conge, CongeDocument } from './schemas/conge.schema';
import { Model } from 'mongoose';

@Injectable()
export class CongeService {

  constructor(
    @InjectModel(Conge.name) private readonly congeModel: Model<CongeDocument>,
  ) {}

  async create(createCongeDto: CreateCongeDto) {
    const alreadyExists = await this.congeModel.exists({ employerId: createCongeDto.employerId}).lean();
    if(alreadyExists){
      
      throw new ConflictException(`cet employer est déjà en congés`);
    }
    const createdConge = await this.congeModel.create(createCongeDto);

    if (!createdConge) {
      throw new InternalServerErrorException(
        'Impossible de créer le employer, veuillez réessayer',
      );
    }
    return createdConge;
  }

  async findAll() {
    const conges = await this.congeModel.find().populate('employerId').exec();
    return conges;
  }

  async findOne(id: string) {
    const conge = await this.congeModel.findById(id).populate('employerId');

    if (!conge) {
      throw new NotFoundException('information non trouvée');
    }
    return conge;
  }

  async update(id: number, updateCongeDto: UpdateCongeDto) {
    const cong: Conge = await this.congeModel
    .findByIdAndUpdate(id, { $set: updateCongeDto }, { new: true })
    .exec();
  if (!cong) {
    throw new NotFoundException(`The employee with id #${id} was not found.`);
  }
  return cong;
  }

  async remove(id: string) {
    await this.congeModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `employer deleted`;
  }

  async congebackup() {
    const conges = await this.congeModel.find().exec();
    return conges;
  }
}
