import { Test, TestingModule } from '@nestjs/testing';
import { DelecountryController } from './delecountry.controller';
import { DelecountryService } from './delecountry.service';

describe('DelecountryController', () => {
  let controller: DelecountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelecountryController],
      providers: [DelecountryService],
    }).compile();

    controller = module.get<DelecountryController>(DelecountryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
