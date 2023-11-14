import { Injectable } from '@nestjs/common';
import { CreateStockPaysDto } from './dto/create-stock-pay.dto';
import { UpdateStockPaysDto } from './dto/update-stock-pay.dto';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StockPays } from './schemas/stockpays.schema';
import { StockDocument } from 'src/stock/schemas/stock.schema';

@Injectable()
export class StockPaysService {
  
  constructor(@InjectModel(StockPays.name) private readonly stockpaysModel: Model<StockDocument>){}

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

  async findOne(id: string) {
    return `This action returns a #${id} stockPay`;
  }

  async findpaysproduit(productId: string, paysId: string){
    console.log('pays id', paysId);
    const product = await this.stockpaysModel.findOne({productId: productId, paysId: paysId}).exec();
    console.log('pays product', product);

    return product;

  }

  async findAllproductbycountry(paysId: string){
   
    const product = await this.stockpaysModel.find({paysId:paysId}).populate('productId').populate('paysId').exec();
    return product;

  }

  async update(id: string, updateStockPaysDto: UpdateStockPaysDto) {
    return this.stockpaysModel
      .findOneAndUpdate({ id }, updateStockPaysDto, {
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
}
