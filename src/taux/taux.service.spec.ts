import { Test, TestingModule } from '@nestjs/testing';
import { TauxService } from './taux.service';

describe('TauxService', () => {
  let service: TauxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TauxService],
    }).compile();

    service = module.get<TauxService>(TauxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
