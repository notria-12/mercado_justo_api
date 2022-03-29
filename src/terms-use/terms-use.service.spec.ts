import { Test, TestingModule } from '@nestjs/testing';
import { TermsUseService } from './terms-use.service';

describe('TermsUseService', () => {
  let service: TermsUseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsUseService],
    }).compile();

    service = module.get<TermsUseService>(TermsUseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
