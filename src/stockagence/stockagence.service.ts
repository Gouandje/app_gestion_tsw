import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStockagenceDto } from './dto/create-stockagence.dto';
import { UpdateStockagenceDto } from './dto/update-stockagence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Stockagence, StockagenceDocument } from './schemas/stockagence.schema';
import { ProduitService } from 'src/produit/produit.service';
import { AgenceService } from 'src/angence/agence.service';

@Injectable()
export class StockagenceService {

  constructor(
    @InjectModel(Stockagence.name) private readonly stockagenceModel: Model<StockagenceDocument>,
    private readonly produitService: ProduitService,
    private readonly paysService: AgenceService){}

  async create(createStockagenceDto: CreateStockagenceDto) {

    createStockagenceDto.quantitytotalenmagasin = createStockagenceDto.quantity;
    const createdStockagence = await this.stockagenceModel.create(createStockagenceDto);
    if(!createdStockagence){
      throw new BadRequestException('Echèc d\'enregistrement');
    }

    return createStockagenceDto;
  }

  async findAll(id: string) {
    const stockagence = await this.stockagenceModel.find({agenceId:id}).populate('productId').populate('agenceId').exec();
    return stockagence;
  }

  async updateagenceStock(agenceId: string, productId, updateStockagenceDto: UpdateStockagenceDto) {
    return this.stockagenceModel
      .updateOne({ agenceId, productId }, updateStockagenceDto)
      .lean();
  }

  async findOne(id: string) {
    const stockagence = await this.stockagenceModel
    .find({_id: id})
    .populate('agenceId')
    .populate('productId')
    .exec();
    
    return stockagence;
  }

  async findagenceproduit(agenceId: string, productId: string){

    const product = await this.stockagenceModel.findOne({agenceId: agenceId, productId: productId}).populate('productId').exec();
    return product;

  }

  async update(id: string, updateStockagenceDto: UpdateStockagenceDto) {
    const stockagence = await this.findOne(id);
    return stockagence;
  }

  async updateStockagence(bureauId, productId, qty){
    const stockagence = await this.stockagenceModel
    .find({agenceId: bureauId, productId: productId});
    if(stockagence != null){

    }
    console.log(stockagence);
  }

  async remove(id: string) {
    await this.stockagenceModel.findOneAndRemove({agenceId: id});
  }
}
