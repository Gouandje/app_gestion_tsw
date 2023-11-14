import { Test, TestingModule } from '@nestjs/testing';
import { TauxController } from './taux.controller';
import { TauxService } from './taux.service';

describe('TauxController', () => {
  let controller: TauxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TauxController],
      providers: [TauxService],
    }).compile();

    controller = module.get<TauxController>(TauxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
