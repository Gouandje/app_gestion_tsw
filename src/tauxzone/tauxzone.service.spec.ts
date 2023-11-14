import { Test, TestingModule } from '@nestjs/testing';
import { TauxzoneService } from './tauxzone.service';

describe('TauxzoneService', () => {
  let service: TauxzoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TauxzoneService],
    }).compile();

    service = module.get<TauxzoneService>(TauxzoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
