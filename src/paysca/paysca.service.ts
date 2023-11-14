import { Injectable } from '@nestjs/common';
import { CreatePayscaDto } from './dto/create-paysca.dto';
import { UpdatePayscaDto } from './dto/update-paysca.dto';
import { Paysca, PayscaDocument } from './schemas/paysca.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payscayear, PayscayearDocument } from './schemas/payscayear.schema';
import { json } from 'stream/consumers';

@Injectable()
export class PayscaService {

  constructor(
    @InjectModel(Paysca.name) private readonly payscaModel: Model<PayscaDocument>,
    @InjectModel(Payscayear.name) private readonly payscayearModel: Model<PayscayearDocument>

    ){}


  async create(createPayscaDto: any) {
    const weekendy = await  this.payscaModel.create(createPayscaDto);
    if(weekendy){

      const infoCapaysyear = {
        countryId: createPayscaDto.countryId,
        year: createPayscaDto.annee,
        caTotal: createPayscaDto.caTotal
      };

      const getPaysCaYear = await this.findOnePaysCaYearExist(infoCapaysyear.countryId, infoCapaysyear.year);

      if(getPaysCaYear !=null){
        const upadateinfopaysCaYear = {
          countryId: getPaysCaYear.countryId,
          year: createPayscaDto.annee,
          caTotal: createPayscaDto.caTotal + getPaysCaYear.caTotal
        };
        await this.payscayearModel.findByIdAndUpdate({_id: getPaysCaYear._id.toString('hex')}, upadateinfopaysCaYear,{new: true}).lean();
      }else{

        await this.payscayearModel.create(infoCapaysyear)
      }

    }
  }

  async findAll(year: string) {
    const result =[];
    const capays = await this.payscaModel.find().populate('countryId').populate('mois').exec();
    console.log('capays',capays[0].annee);
    for(let i=0; i<capays.length; i++){
      if(capays[i].annee == year){
        console.log('capays',capays[i])
        result.push(capays[i]);
      }
    }
    console.log('result',result);
    

    return result;
  }

  async findAllCaYear() {
    const result = await this.payscayearModel.find().populate('countryId').populate('year');

    return result;
  }

  async findAllByCountry(countryId: string){
    const capays = await this.payscaModel.find({countryId: countryId}).populate('countryId');
    return capays;
  }

  async findOne(id: string) {
    const camois = await this.payscaModel.findOne({countryId: id});
    return camois;
  }

  async findOnePaysCamoisExist(id: string, mois: string) {
    
    const camois = await this.payscaModel.findOne({countryId: id, mois: mois}).populate('countryId').populate('mois');
    
    return camois;
  }

  async findPaysCamois() {
    

    const camois = await this.payscaModel.find().populate('countryId').populate('annee').populate('mois').exec();

    return camois;
  }

  async findOnePaysCaYearExist(id: string, year: string) {
    const cayear = await this.payscayearModel.findOne({countryId: id, year: year});
    return cayear;
  }

  async update(id: string, updatePayscaDto: any) {
    const update = await this.payscaModel.findByIdAndUpdate({_id: id}, updatePayscaDto, {new: true}).lean();
    if(update){

      const infoCapaysyear = {
        countryId: updatePayscaDto.countryId,
        year: updatePayscaDto.annee,
        caTotal: updatePayscaDto.caTotal
      };

      const getPaysCaYear = await this.findOnePaysCaYearExist(infoCapaysyear.countryId, infoCapaysyear.year);

      if(getPaysCaYear !=null){
        const upadateinfopaysCaYear = {
          countryId: getPaysCaYear.countryId,
          year: updatePayscaDto.annee,
          caTotal: updatePayscaDto.caTotal + getPaysCaYear.caTotal
        };
        await this.payscayearModel.findByIdAndUpdate({_id: getPaysCaYear._id.toString('hex')}, upadateinfopaysCaYear,{new: true}).lean();
      }else{

        await this.payscayearModel.create(infoCapaysyear)
      }

    }
    return update
  }

  async remove(id: string) {
    const paysca = await this.payscaModel.find({countryId: id}).exec();

    if(paysca != null){
      for(let i=0; i<paysca.length; i++){
        await this.payscaModel.findByIdAndRemove(paysca[i]._id);
      }
    }
  }
}
