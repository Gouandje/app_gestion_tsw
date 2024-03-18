import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMvtStocPaysEntrepotkDto } from './dto/create-mvt-stock.dto';
import { UpdateMvtStockDto } from './dto/update-mvt-stock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MvtStockPaysEntrepot, MvtStockPaysEntrepotDocument } from './schemas/mvt-stock.schema';
import { Model } from 'mongoose';
import { EntrepotService } from 'src/entrepot/entrepot.service';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { StockService } from 'src/stock/stock.service';
import { PaysService } from 'src/pays/pays.service';
import { CreateStockPaysDto } from 'src/stock-pays/dto/create-stock-pay.dto';
import { CreateEntrepotDto } from 'src/entrepot/dto/create-entrepot.dto';

@Injectable()
export class MvtStockService {
  constructor(
    @InjectModel(MvtStockPaysEntrepot.name) private readonly mvtstockpaysentrepotModel: Model<MvtStockPaysEntrepotDocument>,
    private readonly entrepotService: EntrepotService,
    private readonly stockpaysService: StockPaysService,
    private readonly stockService: StockService,
    private readonly paysService: PaysService
  ){

  }
  async create(createMvtStockDto: CreateMvtStocPaysEntrepotkDto) {
    const productpays = await this.stockpaysService.findpaysproduit(createMvtStockDto.productId, createMvtStockDto.paysId);
    if(createMvtStockDto.quantity <= productpays.quantity){
      const createdentrepot = await this.mvtstockpaysentrepotModel.create(createMvtStockDto);
      if(createdentrepot){
        const createEntrepotDto: CreateEntrepotDto = {
          productId: createMvtStockDto.productId,
          quantity: createMvtStockDto.quantity,
          enterDate: createMvtStockDto.sortieDate,
          fabDate: createMvtStockDto.fabDate,
          expirDate: createMvtStockDto.expirDate,
          alertDate: createMvtStockDto.alertDate,
  
        };
        const sendentrepot = this.entrepotService.create(createEntrepotDto);
        console.log('sendentrepot', sendentrepot);
  
               const updateProduitDto: CreateStockPaysDto = {
                paysId: createMvtStockDto.paysId,
                productId: createMvtStockDto.productId,
                quantity: productpays.quantity - createMvtStockDto.quantity,
              };
  
              await this.stockpaysService.updatepaysStock(updateProduitDto.paysId, updateProduitDto.productId, updateProduitDto);
      }

    }else{
      throw new InternalServerErrorException('impossible car la quantité de produit que vous souhaitez faire sortie du magasin du pays n\'est pas suffisante');

    }

   
  }

  async findAll() {
    const mvtstockpaysentrepot = await this.mvtstockpaysentrepotModel.find().populate('productId').populate('paysId').exec();
    return mvtstockpaysentrepot;
  }

  async findOne(id: string) {
    const singlemvtstockentrepot = await this.mvtstockpaysentrepotModel.findById(id).exec();
    return singlemvtstockentrepot;
  }

  update(id: string, updateMvtStockDto: UpdateMvtStockDto) {
    return `This action updates a #${id} mvtStock`;
  }

  async remove(id: string) {
    await this.mvtstockpaysentrepotModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `mouvement supprimé avec succès`;
  }

  async mvtstockbackup() {
    return await this.mvtstockpaysentrepotModel.find().exec();
  }
}
