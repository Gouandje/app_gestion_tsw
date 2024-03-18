import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ProduitService } from 'src/produit/produit.service';
import { Stock, StockDocument } from './schemas/stock.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaysService } from 'src/pays/pays.service';
import { UpdateProduitDto } from 'src/produit/dto/update-produit.dto';
import { CreateStockPaysDto } from 'src/stock-pays/dto/create-stock-pay.dto';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';

@Injectable()
export class StockService {

  constructor(
    @InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>,
    private readonly produitService: ProduitService,
    private readonly stockpaysService: StockPaysService,
    private readonly paysService: PaysService){

  }
  async create(createStockDto: CreateStockDto) {
    // try {
      const createdStock = await this.stockModel.create(createStockDto);
      
      if(createdStock){
        const product = await this.stockpaysService.findpaysproduit(createStockDto.productId, createStockDto.paysId);
        // console.log('ici stock du pays', product);
        if(product == null){
          const createstockPaysDto = {
            paysId: createStockDto.paysId,
            productId: createStockDto.productId,
            quantity: createStockDto.quantity,
            qtyalerte:createStockDto.alertQty
    
          };
          await this.stockpaysService.createstockPays(createstockPaysDto);

        }else{
          
          const updateProduitDto: CreateStockPaysDto = {
            paysId: createStockDto.paysId,
            productId: createStockDto.productId,
            quantity: product.quantity + createStockDto.quantity,
    
          };

          // console.log('test ici', updateProduitDto);
          await this.stockpaysService.updatepaysStock(updateProduitDto.paysId, updateProduitDto.productId, updateProduitDto);
    
        }

      }
      
     
      if (!createdStock) {
        throw new BadRequestException('Sale not created');
      }
  
    // } catch (error) {
    //     throw new InternalServerErrorException(error);
    // }
    return createStockDto;

  }

  
  async findDetail(id){
    const productDetail = await this.stockModel
                    .find({productId: id})
                    .populate('productId')
                    .exec();

    console.log(productDetail);                 

  }

  async findAll() {
    const products = await this.stockModel
                    .find()
                    .populate('paysId')
                    .populate('productId')
                    .exec();
    return products;
  }

  findOne(id: string) {
    return `This action returns a #${id} stock`;
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.stockModel
    .findOneAndUpdate({ id }, updateStockDto, {
      new: true,
    })
    .lean();
  }

  async remove(id: string) {
    await this.stockModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `stock supprimé avec succès`;
  }

  async removebyCountry(id: string) {
    await this.stockModel.findByIdAndRemove({paysId: id}).exec()
    return `stock supprimé avec succès`;
  }

  async stockbackup(){
    return await this.stockModel.find().exec(); 
  }
}
