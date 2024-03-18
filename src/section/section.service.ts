import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section, SectionDocument } from './schemas/section.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chefsectionprime, ChefsectionprimeDocument } from './schemas/chefsectionprime.schema';
import { Sectionca, SectioncaDocument } from './schemas/sectionca.schema';
import { Sectioncamois, SectioncamoisDocument } from './schemas/sectioncamois.schema';

@Injectable()
export class SectionService {

  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<SectionDocument>,
    @InjectModel(Chefsectionprime.name) private readonly chefsectionprimeModel: Model<ChefsectionprimeDocument>,
    @InjectModel(Sectionca.name) private readonly sectioncaModel: Model<SectioncaDocument>,
    @InjectModel(Sectioncamois.name) private readonly sectioncamoisModel: Model<SectioncamoisDocument>,
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

  async findsectioncabySection(sectionId:string, annee:string) {
    
    const sectionca = await this.sectioncaModel.findOne({sectionId: sectionId, annee: annee}).exec();

    return sectionca;
  }

  async findsectioncamoisbySection(sectionId:string, annee:string, mois:string) {
    const sectioncamois = await this.sectioncamoisModel.findOne({sectionId: sectionId, annee: annee, mois: mois}).exec();

    return sectioncamois;
  }

  async findAllsectionca(sectionId:string) {
    const sectionca = await this.sectioncaModel.find({sectionId: sectionId}).populate('annee').populate('mois').exec();

    return sectionca;
  }

  async findAllsectioncamois(sectionId, annee) {
    if(annee =''){
      const sectioncamois = await this.sectioncamoisModel.find({sectionId: sectionId}).populate('annee').populate('mois').exec();

      return sectioncamois;
    }
    const sectioncamois = await this.sectioncamoisModel.find({sectionId: sectionId, annee: annee}).populate('annee').populate('mois').exec();

    return sectioncamois;
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
      .findByIdAndUpdate({ _id: id }, {$set: updateSectionDto}, {
        new: true,
      })
      .exec();

  }

  async updateprimechefsection(id: string, updateChefsectionprimeDto: any) {
    return this.chefsectionprimeModel
      .findByIdAndUpdate({_id: id }, {$set: updateChefsectionprimeDto}, {
        new: true,
      })
      .exec();
  }


  async findOne(id: string) {
    const section = await this.sectionModel.findOne({_id:id}).exec();

    if (!section) {
      throw new NotFoundException('section non trouvé');
    }
    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    return this.sectionModel
      .findByIdAndUpdate({ _id: id }, {$set: updateSectionDto}, {
        new: true,
      })
      .exec();
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

   async sectionbackup(){
    return await this.sectionModel.find().exec();
   }

   async chefsectionprimebackup(){
    return await this.chefsectionprimeModel.find().exec();
   }

   async sectioncabackup(){
    return await this.sectioncaModel.find().exec();
   }

   async sectioncamoisbackup(){
    return await this.sectioncamoisModel.find().exec();
   }

  
  
  

  
}
