import { Test, TestingModule } from '@nestjs/testing';
import { MvtStockController } from './mvt-stock.controller';
import { MvtStockService } from './mvt-stock.service';

describe('MvtStockController', () => {
  let controller: MvtStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MvtStockController],
      providers: [MvtStockService],
    }).compile();

    controller = module.get<MvtStockController>(MvtStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
