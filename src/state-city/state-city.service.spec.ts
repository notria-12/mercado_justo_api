import { Test, TestingModule } from '@nestjs/testing';
import { StateCityService } from './state-city.service';

describe('StateCityService', () => {
  let service: StateCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateCityService],
    }).compile();

    service = module.get<StateCityService>(StateCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
