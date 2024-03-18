import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
import { Entrepot, EntrepotDocument } from './schemas/entrepot.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntrepotOperation, EntrepotOperationDocument } from './schemas/entrepotoperation.schema';
import { EntrepotProduitStock, EntrepotProduitStockDocument } from './schemas/entrepotproduitstock.schema';
import { StockService } from 'src/stock/stock.service';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { PaysService } from 'src/pays/pays.service';
import { CreateStockDto } from 'src/stock/dto/create-stock.dto';
import { CreateSortieStockEntrepot } from './dto/create-sortie-stock-entrepot.dto';
import { SortieProduitEntrepot, SortieProduitEntrepotDocument } from './schemas/sortieproduitentrepot.schema';
import { StockAlerteEntrepot, StockAlerteEntrepotDocument } from './schemas/stockalertentrepot.schema';
import { CreateStockAlerteEntrepotDto } from './dto/create-stock-alerte.dto';
import { UpdateStockAlerteEntrepotDto } from './dto/update-stock-alerte-entrepot.dto';

@Injectable()
export class EntrepotService {

  constructor(
    @InjectModel(Entrepot.name) private readonly entrepotModel: Model<EntrepotDocument>,
    @InjectModel(StockAlerteEntrepot.name) private readonly stockalertentrepotModel: Model<StockAlerteEntrepotDocument>,
    @InjectModel(EntrepotOperation.name) private readonly entrepotoperationModel: Model<EntrepotOperationDocument>,
    @InjectModel(SortieProduitEntrepot.name) private readonly sortieproduitentrepotModel: Model<SortieProduitEntrepotDocument>,
    @InjectModel(EntrepotProduitStock.name) private readonly entrepotproduitstockModel: Model<EntrepotProduitStockDocument>,
    private readonly stockpaysService: StockPaysService,
    private readonly stockService: StockService,
    private readonly paysService: PaysService
    ){

  }

  async create(createEntrepotDto: CreateEntrepotDto) {
    const createdentrepot = await this.entrepotModel.create(createEntrepotDto);
    if(createdentrepot){
      const operationentrepot = {
        productId:createEntrepotDto.productId,
        quantity:createEntrepotDto.quantity,
        operationDate:createEntrepotDto.enterDate,
        typeoperation:"entrestock",
      };
      const operationtreeentrepot = await this.entrepotoperationModel.create(operationentrepot);
      if(operationtreeentrepot){
          const stockproductcurrententrepot = await this.entrepotproduitstockModel.findOne({productId: createEntrepotDto.productId}).exec();
        if(stockproductcurrententrepot == null){
          const stockentrepot = {
            productId: createEntrepotDto.productId,
            quantity: createEntrepotDto.quantity
          };
          this.entrepotproduitstockModel.create(stockentrepot);
        }else{
          const currentquantity = stockproductcurrententrepot.quantity
          const finalquantity = createEntrepotDto.quantity + currentquantity
          console.log('finalquantity',finalquantity)
          const stockentrepot = {
            productId: createEntrepotDto.productId,
            quantity: finalquantity
          }
          const id = stockproductcurrententrepot._id
          const essai= this.entrepotproduitstockModel.findByIdAndUpdate({_id: id}, stockentrepot, {new: true}).exec();
        }

      }   

    }
  }

  async createSortieEntrepot(createSortieStockEntrepotDto:CreateSortieStockEntrepot){

    const produitasortie = await this.entrepotModel.findOne(
      {productId: createSortieStockEntrepotDto.productId,
      fabDate: createSortieStockEntrepotDto.fabDate,
      expirDate: createSortieStockEntrepotDto.expirDate
      }).exec();
      
    if(produitasortie==null){
      throw new NotFoundException(`Il semble que les informations liées à ce produit que vous souhaitez faire sortir ne sont pas correctes. Veuillez verifier la date de fabrication ou la date de péremption..!`);
    }else{
      const stockproductcurrententrepot = await this.entrepotproduitstockModel.findOne({productId: createSortieStockEntrepotDto.productId}).exec();
      if(stockproductcurrententrepot !=null && stockproductcurrententrepot.quantity >= createSortieStockEntrepotDto.quantity){

        const sortiestockentrepot = await this.sortieproduitentrepotModel.create(createSortieStockEntrepotDto);
        if(sortiestockentrepot){
          const consignedentrepot = this.stockService.create(createSortieStockEntrepotDto);

          if(consignedentrepot){
            const operationentrepot = {
              countryId: createSortieStockEntrepotDto.paysId,
              productId:createSortieStockEntrepotDto.productId,
              quantity:createSortieStockEntrepotDto.quantity,
              operationDate:createSortieStockEntrepotDto.enterDate,
              typeoperation:"sortietock",
            };
            const operationtreeentrepot = await this.entrepotoperationModel.create(operationentrepot);
        
            const currentquantity = stockproductcurrententrepot.quantity;
            const finalquantity = currentquantity - createSortieStockEntrepotDto.quantity;
            const stockentrepot = {
              productId: createSortieStockEntrepotDto.productId,
              quantity: finalquantity
            };
            const id = stockproductcurrententrepot._id;
            await this.entrepotproduitstockModel.findByIdAndUpdate({_id: id}, {$set:stockentrepot}, {new: true}).exec();
          }

        }

      }else{
        throw new NotFoundException('La quantité du produit que vous souhaitez faire sortir est supérieure à la quantité disponible en stock qui est de: '+ `${stockproductcurrententrepot.quantity}`+'!');

      }

      
      
    }
    return {message: "created"};
  }

  async findproduitstockentrepot(productId:string){
    const stockproductcurrententrepot = await this.entrepotproduitstockModel.findOne({productId: productId}).exec();
    return stockproductcurrententrepot;

  }

  async updatestockentrepot(id, updateData: any){

    return await this.entrepotproduitstockModel.findByIdAndUpdate({_id: id}, {$set:updateData}, {new: true}).exec();

  }

  async findAll() {
    const entrepot = await this.entrepotModel.find().populate('productId').exec();
    return entrepot;
  }

  async findAllProductStockEntrepot() {
    const entrepot = await this.entrepotproduitstockModel.find().populate('productId').exec();
    return entrepot;
  }

  async findAllProductSortieStockEntrepot() {
    const sortieentrepot = await this.sortieproduitentrepotModel.find().populate('productId').populate('paysId').exec();
    
    return sortieentrepot;
  }

  async findAllOperation() {
    const entrepot = await this.entrepotoperationModel.find().populate('productId').populate('countryId').exec();
    return entrepot;
  }

  findOne(id: string) {
    return `This action returns a #${id} entrepot`;
  }

  update(id: string, updateEntrepotDto: UpdateEntrepotDto) {
    return `This action updates a #${id} entrepot`;
  }

  async remove(id: string) {
    const deleted = await this.entrepotoperationModel.findByIdAndRemove(id);
    return deleted;
  }

  async createstockalert(createstockalerteEntrepotDto: CreateStockAlerteEntrepotDto){
    const alreadyExists = await this.stockalertentrepotModel.exists({ productId: createstockalerteEntrepotDto.productId }).lean();
    if(alreadyExists){
      throw new ConflictException(`la quantité alerte a été déjà definie pour cet produit`);
    }
    else{
    const createstockalert = this.stockalertentrepotModel.create(createstockalerteEntrepotDto)
    }
  }

  async findAllstockalert(){
    const products = await this.stockalertentrepotModel.find().populate('productId').exec();
    return products;
  }

  async findsinglestockalertbyproduct(productId: string){
    const products = await this.stockalertentrepotModel.findOne({productId:productId}).populate('productId').exec();
    return products;
  }

  async findOnestockalert(stockalertId: string){
    const product = await this.stockalertentrepotModel.findById(stockalertId).populate('productId');

    if (!product) {
      throw new NotFoundException('Non trouvé');
    }
    return product;
  }

  async updatestockalert(stockalertId: string, updatestockalerteEntrepotDto: UpdateStockAlerteEntrepotDto) {
    const stockalert = await this.findOne(stockalertId);

    const updatedStockalert = this.stockalertentrepotModel.findOneAndUpdate({_id: stockalertId }, updatestockalerteEntrepotDto, {
      new: true,
    }).exec();

    return updatedStockalert;
  }


  async removestockalert(stockalertId: string) {
    await this.stockalertentrepotModel.findByIdAndRemove(stockalertId).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `Produit supprimé avec succès`;
  }

  async entrepotbackup() {
    const entrepot = await this.entrepotModel.find().exec();
    return entrepot;
  }

  async operationentrepotbackup() {
    const entrepot = await this.entrepotoperationModel.find().exec();
    return entrepot;
  }

  async entrepotstockbackup() {
    const entrepot = await this.entrepotModel.find().exec();
    return entrepot;
  }

  async sortieentrepotbackup() {
    const entrepot = await this.sortieproduitentrepotModel.find().exec();
    return entrepot;
  }

  async stockalertbackup() {
    const entrepot = await this.stockalertentrepotModel.find().exec();
    return entrepot;
  }
}
