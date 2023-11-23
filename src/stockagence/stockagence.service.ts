import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStockagenceDto } from './dto/create-stockagence.dto';
import { UpdateStockagenceDto } from './dto/update-stockagence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Stockagence, StockagenceDocument } from './schemas/stockagence.schema';
import { ProduitService } from 'src/produit/produit.service';
import { AgenceService } from 'src/angence/agence.service';
import { it } from 'node:test';

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

  async deledirect(id){
    const stockagence = await this.stockagenceModel.find({agenceId:id}).exec()
    for(let i=0; i<stockagence.length; i++){
      await this.stockagenceModel.findOneAndRemove(stockagence[i]._id);
    }
  }

  async directcreate(){
    const items=[

      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650996d3399af499282e762f",
        "quantity": 28,
        "quantitytotalenmagasin": 28,
        
      },
      
      {"agenceId": "6536569073375519fb404a2e",
         "productId": "650996f9399af499282e7633",
         "quantity": 26,
         "quantitytotalenmagasin": 26,
         
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "6509973e399af499282e7639",
        "quantity": 30,
        "quantitytotalenmagasin": 30,
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650997bf399af499282e7643",
        "quantity": 180,
        "quantitytotalenmagasin": 180,
        
      },
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099816399af499282e7646",
        "quantity": 93,
        "quantitytotalenmagasin": 93,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099821399af499282e7649",
        "quantity": 103,
        "quantitytotalenmagasin": 103,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "6509983b399af499282e764c",
        "quantity": 70,
        "quantitytotalenmagasin": 70,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099885399af499282e7652",
        "quantity": 38,
        "quantitytotalenmagasin": 38,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650998ba399af499282e7655",
        "quantity": 44,
        "quantitytotalenmagasin": 44,
        
      },
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650998e5399af499282e7658",
        "quantity": 44,
        "quantitytotalenmagasin": 44,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "6509994f399af499282e765b",
        "quantity": 46,
        "quantitytotalenmagasin": 46,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099967399af499282e765e",
        "quantity": 48,
        "quantitytotalenmagasin": 48,
        
      },
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "6509999f399af499282e7664",
        "quantity": 23,
        "quantitytotalenmagasin": 23,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650999c4399af499282e7667",
        "quantity": 55,
        "quantitytotalenmagasin": 55,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "650999f2399af499282e766a",
        "quantity": 60,
        "quantitytotalenmagasin": 60,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099a1e399af499282e766d",
        "quantity": 72,
        "quantitytotalenmagasin": 72,
        
      },
      
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099a3d399af499282e7670",
        "quantity": 67,
        "quantitytotalenmagasin": 67,
        
      },
      
      {
        "agenceId": "6536569073375519fb404a2e",
        "productId": "65099a4e399af499282e7673",
        "quantity": 68,
        "quantitytotalenmagasin": 68,
        
      },
      
      ];

      for(let i=0; i<items.length; i++){
        await this.stockagenceModel.create({agenceId:items[i].agenceId, productId :items[i].productId, quantity:items[i].quantity,quantitytotalenmagasin:items[i].quantitytotalenmagasin});
      }
  }

  async findAll(id: string) {
    const stockagence = await this.stockagenceModel.find({agenceId:id}).populate('productId').populate('agenceId').exec();
    return stockagence;
  }

  async updateagenceStock(id: string, updateStockagenceDto: UpdateStockagenceDto) {
    return this.stockagenceModel
      .findByIdAndUpdate({ _id: id }, updateStockagenceDto,{
        new: true,
      })
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

  async findagenceproduit(agenceId: string, productId){

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
