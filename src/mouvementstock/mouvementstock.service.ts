import { Injectable } from '@nestjs/common';
import { CreateMouvementstockDto } from './dto/create-mouvementstock.dto';
import { UpdateMouvementstockDto } from './dto/update-mouvementstock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mouvementstock, MouvementstockDocument } from './schemas/mouvementstock.schema';
import { HydratedDocument, Model, Schema as MongooseSchema } from "mongoose";
import { StockagenceService } from 'src/stockagence/stockagence.service';
import { SalaireService } from 'src/salaire/salaire.service';
import { CreateStockagenceDto } from 'src/stockagence/dto/create-stockagence.dto';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { CreateStockPaysDto } from 'src/stock-pays/dto/create-stock-pay.dto';
import { AgenceService } from 'src/angence/agence.service';
import { UpdateStockPaysDto } from 'src/stock-pays/dto/update-stock-pay.dto';
import { UpdateStockagenceDto } from 'src/stockagence/dto/update-stockagence.dto';
import { Consignation, ConsignationDocument } from './schemas/consignation.schema';
import { ProduitService } from 'src/produit/produit.service';

@Injectable()
export class MouvementstockService {

  constructor(
    @InjectModel(Mouvementstock.name) private readonly mvtstockModel: Model<MouvementstockDocument>,
    @InjectModel(Consignation.name) private readonly consignationModel: Model<ConsignationDocument>,
    private stockpaysService: StockPaysService,
    private productService: ProduitService,
    private agenceStockService: StockagenceService,
    private agenceService: AgenceService
  ){}

  async createDirect(createMouvementstockDto: CreateMouvementstockDto){
    // const data = {
    //     "bureauId":"65eaa175382bb54abbf6ce63",
    //     "date_sortie":" 2024-03-09",
    //     "items":[
    //         {
    //         "productId": "65eac117894f343b90dd4f52",
    //         "quantity": 45
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f54",
    //         "quantity": 44
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f56",
    //         "quantity": 0
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f58",
    //         "quantity": 43
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f5a",
    //         "quantity": 0
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f5c",
    //         "quantity": 0
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f5e",
    //         "quantity": 160
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f60",
    //         "quantity": 208
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f62",
    //         "quantity": 250
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f64",
    //         "quantity": 15
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f66",
    //         "quantity": 0
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f68",
    //         "quantity": 47
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f6a",
    //         "quantity": 71
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f6c",
    //         "quantity": 49
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f6e",
    //         "quantity": 45
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f70",
    //         "quantity": 64
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f72",
    //         "quantity": 0
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f74",
    //         "quantity": 49
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f76",
    //         "quantity": 59
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f78",
    //         "quantity": 66
    //         },
    //         {
    //         "productId": "65eb9fb36410b3da421e46a0",
    //         "quantity": 45
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f7a",
    //         "quantity": 38
    //         },
    //         {
    //         "productId": "65eac117894f343b90dd4f7c",
    //         "quantity": 54
    //         }
    //     ]
    //   };
    for(let i = 0; i<createMouvementstockDto.items.length; i++){
      const mvtstock = {
        bureauId: createMouvementstockDto.bureauId,
        date_sortie: createMouvementstockDto.date_sortie,
        productId: createMouvementstockDto.items[i].productId,
        quantity: createMouvementstockDto.items[i].quantity,
      };

      const createdStock = await this.mvtstockModel.create(mvtstock);
      if(createdStock){
        const bureau = await this.agenceService.findSingleAgengence(createMouvementstockDto.bureauId);
        console.log(bureau);
        const product = await this.agenceStockService.findagenceproduit(createMouvementstockDto.bureauId, createMouvementstockDto.items[i].productId);
        if(product == null){
          const createStockagenceDto: CreateStockagenceDto = {
            agenceId: createMouvementstockDto.bureauId,
            productId: createMouvementstockDto.items[i].productId,
            quantity: createMouvementstockDto.items[i].quantity,
            quantitytotalenmagasin: createMouvementstockDto.items[i].quantity
          };
          const result = await this.agenceStockService.create(createStockagenceDto);
         
        }else{
          
          const updateStockagenceDto: UpdateStockagenceDto = {
            agenceId: createMouvementstockDto.bureauId,
            productId: createMouvementstockDto.items[i].productId,
            quantity: product.quantity + createMouvementstockDto.items[i].quantity,
            quantitytotalenmagasin: product.quantity + createMouvementstockDto.items[i].quantity,
          };

          const result = await this.agenceStockService.updateagenceStock(product._id.toString('hex'),  updateStockagenceDto);
        }  
      }
      
    }


  }

 
  async create(createMouvementstockDto: CreateMouvementstockDto){

    const consignedparoduct = {
      bureauId: createMouvementstockDto.bureauId,
      date_sortie: createMouvementstockDto.date_sortie,
      items: createMouvementstockDto.items
    }
    const createconsignation = await this.consignationModel.create(consignedparoduct);
    if(createconsignation){

      for(let i = 0; i<createMouvementstockDto.items.length; i++){
        const mvtstock = {
          bureauId: createMouvementstockDto.bureauId,
          date_sortie: createMouvementstockDto.date_sortie,
          productId: createMouvementstockDto.items[i].productId,
          quantity: createMouvementstockDto.items[i].quantity,
        };

        const createdStock = await this.mvtstockModel.create(mvtstock);
        if(createdStock){
          const bureau = await this.agenceService.findSingleAgengence(createMouvementstockDto.bureauId);
          console.log(bureau);
          const product = await this.agenceStockService.findagenceproduit(createMouvementstockDto.bureauId, createMouvementstockDto.items[i].productId);
          if(product == null){
            const createStockagenceDto: CreateStockagenceDto = {
              agenceId: createMouvementstockDto.bureauId,
              productId: createMouvementstockDto.items[i].productId,
              quantity: createMouvementstockDto.items[i].quantity,
              quantitytotalenmagasin: createMouvementstockDto.items[i].quantity
            };
            const result = await this.agenceStockService.create(createStockagenceDto);
            if(result){
              const productpays = await this.stockpaysService.findpaysproduit(createMouvementstockDto.items[i].productId, bureau.countryId);

              const updateProduitDto: CreateStockPaysDto = {
                paysId: bureau.countryId,
                productId: createMouvementstockDto.items[i].productId,
                quantity: productpays.quantity - createMouvementstockDto.items[i].quantity,
              };

              await this.stockpaysService.updatepaysStock(updateProduitDto.paysId, updateProduitDto.productId, updateProduitDto);

            }
          }else{
            
            const updateStockagenceDto: UpdateStockagenceDto = {
              agenceId: createMouvementstockDto.bureauId,
              productId: createMouvementstockDto.items[i].productId,
              quantity: product.quantity + createMouvementstockDto.items[i].quantity,
              quantitytotalenmagasin: product.quantity + createMouvementstockDto.items[i].quantity,
            };

            const result = await this.agenceStockService.updateagenceStock(product._id.toString('hex'),  updateStockagenceDto);

            if(result){
              const productpays = await this.stockpaysService.findpaysproduit(createMouvementstockDto.items[i].productId, bureau.countryId);

              // console.log('productpays', productpays);

              const updateProduitDto: UpdateStockPaysDto = {
                paysId: bureau.countryId,
                productId: createMouvementstockDto.items[i].productId,
                quantity: productpays.quantity - createMouvementstockDto.items[i].quantity
              };

              await this.stockpaysService.updatepaysStock(updateProduitDto.paysId, updateProduitDto.productId, updateProduitDto);

            }
      
          }  
        }
        
      }
    }
    return createconsignation;
  }

  async findOne(id: string){

  }

  async selectmvtstockbureau(id){
    const stock= await this.mvtstockModel.findOne({bureauId: id}).exec();
    return stock;

  }

  async findAll() {
    const mvtstock = await this.mvtstockModel.find().populate('bureauId').populate('productId').sort({date_sortie: 'desc'}).exec();
    if(mvtstock){

    }
    return mvtstock;
  }

  async findOnebyBureau(id: string) {
    const bureaumvt = await this.mvtstockModel.find({bureauId: id}).exec();
    return bureaumvt;
  }

  async findOnebyBureauForDelete(id: string) {
    const bureaumvt = await this.mvtstockModel.find({bureauId: id}).exec();
    if(bureaumvt !=null){
      for(let i=0; i<bureaumvt.length; i++){
        this.mvtstockModel.findByIdAndRemove(bureaumvt[i]._id);
      }
    }
    return "deleted";
  }

  update(id: string, updateMouvementstockDto: UpdateMouvementstockDto) {
    return `This action updates a #${id} mouvementstock`;
  }

  remove(id: string) {
    return  this.mvtstockModel.findByIdAndRemove(id);
  }

  async findAllConsignation(id){
    const consignations = await this.consignationModel.find({bureauId: id}).populate('items').exec();
    return consignations;
  }

  async findOneConsignation(id){
    const response = [];
    const consignations = await this.consignationModel.findById(id).exec();
    for(let i=0; i<consignations.items.length; i++){
      const product = await this.productService.findOne(consignations.items[i].productId);
      response.push([
        product.name,
        consignations.items[i].quantity,

      ]); 
    }
    return {'response': response, 'date_sortie': consignations.date_sortie};
  }

  async mouvementstockbackup(){
    return await this.mvtstockModel.find().exec()
  }

  async consignationbackup(){
    return await this.consignationModel.find().exec();
  }
}
