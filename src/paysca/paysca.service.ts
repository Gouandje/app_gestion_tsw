import { Injectable } from '@nestjs/common';
import { CreatePayscaDto } from './dto/create-paysca.dto';
import { UpdatePayscaDto } from './dto/update-paysca.dto';
import { Paysca, PayscaDocument } from './schemas/paysca.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payscayear, PayscayearDocument } from './schemas/payscayear.schema';
import { json } from 'stream/consumers';
import { QueryDto } from 'src/weekendy/dto/requete.dto';

@Injectable()
export class PayscaService {

  constructor(
    @InjectModel(Paysca.name) private readonly payscaModel: Model<PayscaDocument>,
    @InjectModel(Payscayear.name) private readonly payscayearModel: Model<PayscayearDocument>

    ){}


  async create(createPayscaDto: any) {
    const weekendy = await  this.payscaModel.create(createPayscaDto);
  }

  async findAll(query: QueryDto) {
    const result =[];
    const capays = await this.payscaModel.find({countryId: query.paysId, annee: query.anneeId}).populate('countryId').populate('mois').exec();
    // console.log('capays',capays[0].annee);
    // for(let i=0; i<capays.length; i++){
    //   if(capays[i].annee == year){
    //     console.log('capays',capays[i])
    //     result.push(capays[i]);
    //   }
    // }
    // console.log('result',result);
    

    return capays;
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

  async findOnePaysCamoisExist(id: string, mois: string, annee:string) {
    
    const camois = await this.payscaModel.findOne({countryId: id, mois: mois, annee:annee}).exec();
    
    return camois;
  }

  async findPaysCamois(id:string) {
    

    const camois = await this.payscaModel.find({countryId:id}).populate('countryId').populate('annee').populate('mois').exec();

    return camois;
  }

  async findOnePaysCaYearExist(id: string, year: string) {
    const cayear = await this.payscayearModel.findOne({countryId: id, year: year}).exec();
    return cayear;
  }
  async updateCaPaysMois(id,upadateinfopaysCaMois){
    const update = await this.payscaModel.findByIdAndUpdate({_id: id}, upadateinfopaysCaMois, {new: true}).lean();

  }

  async createCaPaysYear(CapaysYear:any){

    await this.payscayearModel.create(CapaysYear)

  }

  async updateyear(id: string, updatePayscaDto: any) {
    const update = await this.payscayearModel.findByIdAndUpdate({_id: id}, updatePayscaDto, {new: true}).lean();
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
