import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaysDto } from './dto/create-pays.dto';
import { UpdatePaysDto } from './dto/update-pays.dto';
import { Pays, PaysDocument } from './schemas/pays.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaysService {
  constructor(
    @InjectModel(Pays.name) private readonly paysModel: Model<PaysDocument>,
  ) {}
  async create(createPayDto: CreatePaysDto) {
    const alreadyExists = await this.paysModel.exists({ name: createPayDto.country_name }).lean();
    if(alreadyExists){
      throw new ConflictException(`cet pays existe déjà dans la base de données`);
    }
    const createdPays = await this.paysModel.create(createPayDto);

    if (!createdPays) {
      throw new InternalServerErrorException(
        'Impossible de créer le produit, veuillez réessayer',
      );
    }
    return createdPays;
  }

  async findAll() {
    const pays = await this.paysModel.find().exec();
    return pays;
  }

  async findAllCIV() {
    const nom_pays="Côte d'Ivoire"
    const pays = await this.paysModel.findOne({country_name: nom_pays}).exec();
    return pays;
  }

  async findOne(paysId: string): Promise<Pays> {
    const pays = await this.paysModel.findById(paysId);

    if (!pays) {
      throw new NotFoundException('Pays non trouvé');
    }
    return pays;
  }

  async findpays(paysId: string){
    const pays = (await this.paysModel.findById(paysId)).isSelected('country_name');

    if (!pays) {
      throw new NotFoundException('Pays non trouvé');
    }
    return pays;
  }

  async update(paysId: string, updatePayDto: UpdatePaysDto) {
    return this.paysModel
      .findOneAndUpdate({ paysId }, updatePayDto, {
        new: true,
      })
      .lean();
  }

  async remove(paysId: string) {
    console.log('test id pays', paysId);
    await this.paysModel.findByIdAndRemove(paysId).catch((err) => {
      throw new BadRequestException(err);
    });

    return `Country deleted`;

  }

  async paysbackup(){
    return await this.paysModel.find().exec();
  }
}
