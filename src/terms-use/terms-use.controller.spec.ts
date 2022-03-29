import { Test, TestingModule } from '@nestjs/testing';
import { TermsUseController } from './terms-use.controller';
import { TermsUseService } from './terms-use.service';

describe('TermsUseController', () => {
  let controller: TermsUseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsUseController],
      providers: [TermsUseService],
    }).compile();

    controller = module.get<TermsUseController>(TermsUseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
