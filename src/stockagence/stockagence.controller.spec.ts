import { Test, TestingModule } from '@nestjs/testing';
import { StockagenceController } from './stockagence.controller';
import { StockagenceService } from './stockagence.service';

describe('StockagenceController', () => {
  let controller: StockagenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockagenceController],
      providers: [StockagenceService],
    }).compile();

    controller = module.get<StockagenceController>(StockagenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
