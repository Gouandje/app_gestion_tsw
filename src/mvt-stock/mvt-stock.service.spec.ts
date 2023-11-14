import { Test, TestingModule } from '@nestjs/testing';
import { MvtStockService } from './mvt-stock.service';

describe('MvtStockService', () => {
  let service: MvtStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MvtStockService],
    }).compile();

    service = module.get<MvtStockService>(MvtStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
