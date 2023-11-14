import { Test, TestingModule } from '@nestjs/testing';
import { StockPaysController } from './stock-pays.controller';
import { StockPaysService } from './stock-pays.service';

describe('StockPaysController', () => {
  let controller: StockPaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockPaysController],
      providers: [StockPaysService],
    }).compile();

    controller = module.get<StockPaysController>(StockPaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
