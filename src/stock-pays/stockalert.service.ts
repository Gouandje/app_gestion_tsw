import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaysStockAlert, PaysStockAlertDocument } from "./schemas/stockalertpays.schema";
import { UpdateStockAlerteEntrepotDto } from "src/entrepot/dto/update-stock-alerte-entrepot.dto";
import { CreateStockAlerteEntrepotDto } from "src/entrepot/dto/create-stock-alerte.dto";
import { GetterStockAlertPaysDto } from "src/stock/dto/getterStockAlertPays.dto";

@Injectable()
export class StockAlertPaysService {
    constructor(

        @InjectModel(PaysStockAlert.name) private readonly alertstockModel: Model<PaysStockAlertDocument>){}

        async create(createstockalerteEntrepotDto: CreateStockAlerteEntrepotDto){
            const alreadyExists = await this.alertstockModel.exists({ productId: createstockalerteEntrepotDto.productId }).lean();
            if(alreadyExists){
              throw new ConflictException(`la quantité alerte a été déjà definie pour cet produit`);
            }
            else{
            const createstockalert = this.alertstockModel.create(createstockalerteEntrepotDto)
        
            }
        }
        
        async findsinglebyproduct(productId: string){
            const products = await this.alertstockModel.findOne({productId:productId}).populate('productId').exec();
            return products;
        }
        
        async findOne(stockalertId: string){
            const product = await this.alertstockModel.findById(stockalertId).populate('productId');
        
            if (!product) {
                throw new NotFoundException('Non trouvé');
            }
            return product;
        }
        
        async update(stockalertId: string, updatestockalerteEntrepotDto: UpdateStockAlerteEntrepotDto) {
             // const stockalert = await this.alertstockModel.findOne(stockalertId);
            const updatedStockalert = this.alertstockModel.findOneAndUpdate({_id: stockalertId }, updatestockalerteEntrepotDto, {
                new: true,
            }).exec();
            return updatedStockalert;
        }
        
        async remove(stockalertId: string) {
            await this.alertstockModel.findByIdAndRemove(stockalertId).catch((err) => {
                throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
            });
            return `Produit supprimé avec succès`;
        }
    
        async findAll() {
            const products = await this.alertstockModel.find().populate('productId').exec();
            return products;
        }

        async stockalertbackup(){
            return await this.alertstockModel.find().exec(); 
        }
}