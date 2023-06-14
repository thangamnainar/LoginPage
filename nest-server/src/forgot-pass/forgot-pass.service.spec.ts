import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPassService } from './forgot-pass.service';

describe('ForgotPassService', () => {
  let service: ForgotPassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPassService],
    }).compile();

    service = module.get<ForgotPassService>(ForgotPassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
