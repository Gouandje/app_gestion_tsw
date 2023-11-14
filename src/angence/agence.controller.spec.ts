import { Test, TestingModule } from '@nestjs/testing';
import { AngenceController } from './agence.controller';
import { AngenceService } from './agence.service';

describe('AngenceController', () => {
  let controller: AngenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AngenceController],
      providers: [AngenceService],
    }).compile();

    controller = module.get<AngenceController>(AngenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
