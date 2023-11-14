import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section, SectionDocument } from './schemas/section.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chefsectionprime, ChefsectionprimeDocument } from './schemas/chefsectionprime.schema';
import { Sectionca, SectioncaDocument } from './schemas/sectionca.schema';

@Injectable()
export class SectionService {

  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<SectionDocument>,
    @InjectModel(Chefsectionprime.name) private readonly chefsectionprimeModel: Model<ChefsectionprimeDocument>,
    @InjectModel(Sectionca.name) private readonly sectioncaModel: Model<SectioncaDocument>,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    const alreadyExists = await this.sectionModel.exists({zoneId: createSectionDto.zoneId, section_name: createSectionDto.section_name }).lean();
    if(alreadyExists){
      throw new ConflictException(`cette section existe déjà dans la base de données`);
    }
    const createdsection = await this.sectionModel.create(createSectionDto);

    if (!createdsection) {
      throw new InternalServerErrorException(
        'Impossible de créer la section, veuillez réessayer',
      );
    }
    return createdsection;
  }

  async findAll() {
    const section = await this.sectionModel.find()
                                            .populate('countryId')
                                            .populate('zoneId')
                                            .exec();
    return section;
    
  }

  async findAllByZone(id:string) {
    const section = await this.sectionModel.find({zoneId: id})
                                            .populate('countryId')
                                            .populate('zoneId')
                                            .exec();
    return section;
  }


  async findSectioncaforAgence(id:string, annee:string) {
    const section = await this.sectioncaModel.findOne({_id: id, annee: annee}).exec();
    return section;
  }



  async findOnebycountry(id: string){
    const section = await this.sectionModel.findOne({countryId: id}).exec();
    return section;
  }

  async findprimechefsection(zoneId:string, mois:string, annee:string) {
    const sectionca = await this.chefsectionprimeModel.findOne({zoneId: zoneId, mois:mois, annee: annee}).exec();

    return sectionca;
  }

  async createcasection(data: any){
    const section = await this.sectioncaModel.create(data);
    return section;
  }

  async createprimechefsection(data:any){
    await this.chefsectionprimeModel.create(data);
  }


  async updatesectionca(id: string, updateSectionDto: any) {
    return this.sectioncaModel
      .findOneAndUpdate({ id }, updateSectionDto, {
        new: true,
      })
      .lean();
  }

  async updateprimechefsection(id: string, updateChefsectionprimeDto: any) {
    return this.chefsectionprimeModel
      .findOneAndUpdate({ id }, updateChefsectionprimeDto, {
        new: true,
      })
      .lean();
  }


  async findOne(id: string) {
    const section = (await this.sectionModel.findById(id))
                                            .populated('countryId')
                                            .populated('zoneId')
                                            .exec();

    if (!section) {
      throw new NotFoundException('Pays non trouvé');
    }
    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    return this.sectionModel
      .findOneAndUpdate({ id }, updateSectionDto, {
        new: true,
      })
      .lean();
  }

  async remove(id: string) {
    await this.sectionModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });

    return `section deleted`;
  }

  async findsectionpaysDelete(id: string){
   const section = await this.sectionModel.find({countryId: id}).exec();
   if(section !=null){
    for(let i=0; i<section.length; i++){
      await this.sectionModel.findByIdAndRemove(section[i]._id);
    }
   }
   return;
  }

  async findsectionzoneDelete(id: string){
    const section = await this.sectionModel.find({zoneId: id}).exec();
    if(section !=null){
     for(let i=0; i<section.length; i++){
       await this.sectionModel.findByIdAndRemove(section[i]._id);
     }
    }
    return;
   }

  
}
