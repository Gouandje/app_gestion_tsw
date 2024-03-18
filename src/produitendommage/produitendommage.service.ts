import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVenteProduitendommageDto } from './dto/create-venteproduitendommage.dto';
import { UpdateProduitendommageDto } from './dto/update-produitendommage.dto';
import { Produitendommage, ProduitendommageDocument } from './schemas/produitendommage.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VenteProduitendommage, VenteProduitendommageDocument } from './schemas/venteproduitendommage.schema';
import { CreateProduitendommageDto } from './dto/create-produitendommage.dto copy';
import { StockagenceService } from 'src/stockagence/stockagence.service';
import { UpdateStockagenceDto } from 'src/stockagence/dto/update-stockagence.dto';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { CreateStockPaysDto } from 'src/stock-pays/dto/create-stock-pay.dto';
import { UpdateStockPaysDto } from 'src/stock-pays/dto/update-stock-pay.dto';
import { EntrepotService } from 'src/entrepot/entrepot.service';
import { PayscaService } from 'src/paysca/paysca.service';
import { Produitendommagestock, ProduitendommagestockDocument } from './schemas/produitendommagestock.schema';

@Injectable()
export class ProduitendommageService {
  constructor(
    @InjectModel(Produitendommage.name) private readonly productendoModel: Model<ProduitendommageDocument>,
    @InjectModel(VenteProduitendommage.name) private readonly venteproductendoModel: Model<VenteProduitendommageDocument>,
    @InjectModel(Produitendommagestock.name) private readonly productendostockModel: Model<ProduitendommagestockDocument>,
    private stockagenceService: StockagenceService,
    private stockpaysService: StockPaysService,
    private stockentrepotService: EntrepotService,
    private payscaservice: PayscaService
  ) {}

  async create(createProduitendommageDto: CreateProduitendommageDto) {
    
    const createproductendommage = await this.productendoModel.create(createProduitendommageDto);
    if(createproductendommage){
      const getstock = await this.productendostockModel.findOne({productId: createProduitendommageDto.productId}).exec();
      if(getstock==null){
        const createstock ={
          productId: createProduitendommageDto.productId,
          quantity: createProduitendommageDto.quantity
        };

        await this.productendostockModel.create(createstock);
      }else{
        const updatestock ={
          productId: createProduitendommageDto.productId,
          quantity: createProduitendommageDto.quantity + getstock.quantity
        };
        await this.productendostockModel.findByIdAndUpdate({_id: getstock._id}, {$set: updatestock}, {new: true}).exec();

      }
      if(createProduitendommageDto.origine == 'bureau'){
        console.log(createProduitendommageDto.entrepot_or_agence);
        const product = await this.stockagenceService.findagenceproduitendom(createProduitendommageDto.entrepot_or_agence, createProduitendommageDto.productId);
        console.log('produit', product);
        if(product.quantity - createProduitendommageDto.quantity >= 0){
          const updatestockagence: UpdateStockagenceDto = {
            agenceId:createProduitendommageDto.entrepot_or_agence,
            productId: createProduitendommageDto.productId,
            quantity: product.quantity - createProduitendommageDto.quantity,
            quantitytotalenmagasin: product.quantitytotalenmagasin
          };
          await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
          return createproductendommage;

        }else{
          throw new NotFoundException('la quantité de ce produit est insuffisant dans ce bureau');
        }
        
      }else if(createProduitendommageDto.origine == 'entrepôt national'){

        const product = await this.stockpaysService.findpaysproduit(createProduitendommageDto.productId, createProduitendommageDto.entrepot_or_agence);
        if(product.quantity - createProduitendommageDto.quantity >= 0){
          const updateProduitDto: UpdateStockPaysDto = {
            paysId: createProduitendommageDto.entrepot_or_agence,
            productId: createProduitendommageDto.productId,
            quantity: product.quantity - createProduitendommageDto.quantity,
          };
          await this.stockpaysService.updateStockpaysproduit(product._id.toString('hex'), updateProduitDto);
            
          return createproductendommage;

        }else{
          throw new NotFoundException('la quantité de ce produit est insuffisant dans cet entrepôt');
        }
      }else{

        const product = await this.stockentrepotService.findproduitstockentrepot(createProduitendommageDto.productId);
        if(product.quantity - createProduitendommageDto.quantity<0){
          throw new NotFoundException('la quantité de ce produit est insuffisant dans l\' entrepôt international');
        }
        const stockentrepot = {
          productId: createProduitendommageDto.productId,
          quantity: product.quantity - createProduitendommageDto.quantity
        };
        this.stockentrepotService.updatestockentrepot(product._id.toString('hex'), stockentrepot);

        return createproductendommage;     
      }
    }else{
      throw new NotFoundException('Echec d\'enregistrement');
    }
  
  }

  async findAll() {
    const Products = await this.productendostockModel.find().populate('productId').exec();
    return Products
  }

  async findAllDetailByProduct(productId: string) {
    const Products = await this.productendoModel.find({productId: productId}).populate('productId').exec();
    return Products
  }

  async findOne(id: string) {
    const product = await this.productendostockModel.findOne({productId: id}).populate('productId').exec();
    return product
  }

  update(id: string, updateProduitendommageDto: UpdateProduitendommageDto) {
    return `This action updates a #${id} produitendommage`;
  }

  async remove(id: string) {
    return await this.productendoModel.findByIdAndDelete(id);
  }

  
  async createvente(createventeProduitendommageDto: CreateVenteProduitendommageDto) {
    const product = await this.productendostockModel.findOne({productId: createventeProduitendommageDto.productId}).exec();
    console.log(createventeProduitendommageDto);
    console.log(product);
   if(product.quantity >= createventeProduitendommageDto.quantity){
      const createproductendommage = await this.venteproductendoModel.create(createventeProduitendommageDto);
      if(createproductendommage){
        const updateproductendo = {
          productId: createventeProduitendommageDto.productId,
          quantity: product.quantity - createventeProduitendommageDto.quantity
        };

        await this.productendostockModel.findByIdAndUpdate({_id: product._id}, {$set: updateproductendo}, {new: true}).exec();

        const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(createventeProduitendommageDto.countryId, createventeProduitendommageDto.mois,createventeProduitendommageDto.annee);
        const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(createventeProduitendommageDto.countryId, createventeProduitendommageDto.annee)
        if(getPaysCaMois !=null){

          const upadateinfopaysCaMois = {
            countryId: createventeProduitendommageDto.countryId,
            mois: createventeProduitendommageDto.mois,
            annee: createventeProduitendommageDto.annee,
            caTotal: createventeProduitendommageDto.prix + getPaysCaMois.caTotal
          };

          await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
        
        }else{

          const infoCapays = {
            countryId: createventeProduitendommageDto.countryId,
            mois: createventeProduitendommageDto.mois,
            annee: createventeProduitendommageDto.annee,
            caTotal: createventeProduitendommageDto.prix
          };

          await this.payscaservice.create(infoCapays)
        }

        if(getPaysCaAnnee !=null){
          const upadateinfopaysCaYear = {
            countryId: createventeProduitendommageDto.countryId,
            year: createventeProduitendommageDto.annee,
            caTotal: createventeProduitendommageDto.prix + getPaysCaAnnee.caTotal
          };
          await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
        }else{

          const infoCapaysYear = {
            countryId: createventeProduitendommageDto.countryId,
            year: createventeProduitendommageDto.annee,
            caTotal: createventeProduitendommageDto.prix
          };

          await this.payscaservice.createCaPaysYear(infoCapaysYear)
        }
        return createproductendommage;
      }else{
        throw new NotFoundException('Echec d\'enregistrement');
      }
    }else{
      throw new NotFoundException('stock insuffisant disponible est inférieur à quantité saisie');

    }
   
  
  }

  findAllVente() {
    return this.venteproductendoModel.find().populate('productId').populate('mois').populate('annee')
  }
  

  async produitendommagesbackup(){
    return await this.productendoModel.find().exec();
  }

  async produitendovendubackup(){
    return await this.venteproductendoModel.find().exec();
  }

  async stockproduitendo(){
    return await this.productendostockModel.find().exec();
  }
  

}
