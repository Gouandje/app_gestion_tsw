import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockPaysDto } from './dto/create-stock-pay.dto';
import { UpdateStockPaysDto } from './dto/update-stock-pay.dto';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StockPays } from './schemas/stockpays.schema';
import { StockDocument } from 'src/stock/schemas/stock.schema';
import { UpdateStockAlerteEntrepotDto } from 'src/entrepot/dto/update-stock-alerte-entrepot.dto';
import { CreateStockAlerteEntrepotDto } from 'src/entrepot/dto/create-stock-alerte.dto';
import { PaysStockAlert, PaysStockAlertDocument } from './schemas/stockalertpays.schema';

@Injectable()
export class StockPaysService {
  
  constructor(
    @InjectModel(StockPays.name) private readonly stockpaysModel: Model<StockDocument>){}

  async create(createStockPaysDto) {
    const createdstockpaysproduit = await this.stockpaysModel.create(createStockPaysDto);
    return createdstockpaysproduit
  }

  async createstockPays(createStockPaysDto) {
    const createdstockpaysproduit = await this.stockpaysModel.create(createStockPaysDto);
    return createdstockpaysproduit
  }

  async findAll() {
    const products = await this.stockpaysModel
                    .find()
                    .populate('paysId')
                    .populate('productId')
                    .exec();
    return products;
  }


  async findAllinter() {
    const products = await this.stockpaysModel
                    .find()
                    .populate('paysId')
                    .populate('productId')
                    .exec();               
    return products;
  }

  async findSatusStock(countryId: string, productId: string){
    const productpays = await this.stockpaysModel.find({paysId: countryId, productId:productId}).exec();
    // for(let i=0; i<productpays.length; i++){
    //   if(productpays[i].quantity <= productpays[i].)
    // }
  }

  async findOne(id: string) {
    return `This action returns a #${id} stockPay`;
  }

  async findpaysproduit(productId: string, paysId: string){

    const product = await this.stockpaysModel.findOne({productId: productId, paysId: paysId}).exec();

    return product;

  }

  async updateStockpaysproduit(id: string, updateStockPaysDto: any){
    
    const product = await this.stockpaysModel.findByIdAndUpdate({_id: id}, {$set:updateStockPaysDto}, {new: true}).exec();

    return product;

  }

  async findpaysproduitmigration(productId){
    console.log('productid',productId)
    // console.log('paysid',paysId)
    const product = await this.stockpaysModel.findOne({productId: productId}).exec();

    return product;

  }


  async findAllproductbycountry(paysId: string){
   
    const product = await this.stockpaysModel.find({paysId:paysId}).populate('productId').populate('paysId').exec();
    return product;

  }

  async update(id: string, updateStockPaysDto: UpdateStockPaysDto) {
    return this.stockpaysModel
      .findOneAndUpdate({ _id: id }, updateStockPaysDto, {
        new: true,
      })
      .lean();
  }

  async updatepaysStock(paysId: string, productId, updateStockPaysDto: UpdateStockPaysDto) {
    return this.stockpaysModel
      .updateOne({ paysId, productId }, updateStockPaysDto)
      .lean();
  }

  async remove(id: string) {
    return await this.stockpaysModel.findByIdAndRemove(id);
  }

  async stockpaybackup(){
    return await this.stockpaysModel.find().exec(); 
  }

  
}
