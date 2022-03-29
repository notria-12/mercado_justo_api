import { Test, TestingModule } from '@nestjs/testing';
import { StateCityController } from './state-city.controller';
import { StateCityService } from './state-city.service';

describe('StateCityController', () => {
  let controller: StateCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateCityController],
      providers: [StateCityService],
    }).compile();

    controller = module.get<StateCityController>(StateCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
