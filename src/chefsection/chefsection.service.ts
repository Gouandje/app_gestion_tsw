import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChefsectionDto } from './dto/create-chefsection.dto';
import { UpdateChefsectionDto } from './dto/update-chefsection.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chefsection, ChefsectionDocument } from './schemas/chefsection.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChefsectionService {
  constructor(
    @InjectModel(Chefsection.name) private readonly chefsectionModel: Model<ChefsectionDocument>,
    // private readonly produitService: ProduitService,
    // private readonly paysService: AgenceService
  ){}

  async create(createChefsectionDto: CreateChefsectionDto) {
    const alreadyExists = await this.chefsectionModel.exists({sectionId: createChefsectionDto.sectionId, managerId: createChefsectionDto.managerId }).lean();
    if(alreadyExists){
      throw new ConflictException(`cette section a déjà un superviseur dans la base de données`);
    }
    const created = await this.chefsectionModel.create(createChefsectionDto);

    if (!created) {
      throw new InternalServerErrorException(
        'Impossible d\'éffectuer cette opération, veuillez réessayer',
      );
    }
    return created;
  }

  async findAll() {
   const chefsection = await this.chefsectionModel.find().populate('sectionId').populate('managerId').exec();
    return chefsection;
  }

  async findOne(id: string) {
    const chefsection = await this.chefsectionModel
    .find({_id: id})
    .populate('sectionId')
    .populate('managerId')
    .exec();
    
    return chefsection;
  }

  async findBySection(id: string) {
    const chefsection = await this.chefsectionModel
    .find({sectionId: id})
    .populate('sectionId')
    .populate('managerId')
    .exec();
    
    return chefsection;
  }

  async update(id: string, updateChefsectionDto: UpdateChefsectionDto) {
    const taux = await this.findOne(id);
    const updated = this.chefsectionModel.findOneAndUpdate({_id: id }, updateChefsectionDto, {
      new: true,
    }).exec();


    return updated;
  }

  async remove(id: string) {
    await this.chefsectionModel.deleteOne({ _id: id });
    return {};
  }

  async removechefsectionfordelete(id: string) {
    await this.chefsectionModel.findOneAndRemove({ sectionId: id });
    return {};
  }

  async chefsectionbackup() {
    return await this.chefsectionModel.find().exec();
  }
}
