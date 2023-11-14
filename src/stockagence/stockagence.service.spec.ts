import { Test, TestingModule } from '@nestjs/testing';
import { StockagenceService } from './stockagence.service';

describe('StockagenceService', () => {
  let service: StockagenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockagenceService],
    }).compile();

    service = module.get<StockagenceService>(StockagenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
