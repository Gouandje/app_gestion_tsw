import { Injectable } from '@nestjs/common';
import { CreateMvtStockDto } from './dto/create-mvt-stock.dto';
import { UpdateMvtStockDto } from './dto/update-mvt-stock.dto';

@Injectable()
export class MvtStockService {
  create(createMvtStockDto: CreateMvtStockDto) {
    return 'This action adds a new mvtStock';
  }

  findAll() {
    return `This action returns all mvtStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mvtStock`;
  }

  update(id: number, updateMvtStockDto: UpdateMvtStockDto) {
    return `This action updates a #${id} mvtStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} mvtStock`;
  }
}
