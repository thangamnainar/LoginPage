import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPassController } from './forgot-pass.controller';
import { ForgotPassService } from './forgot-pass.service';

describe('ForgotPassController', () => {
  let controller: ForgotPassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForgotPassController],
      providers: [ForgotPassService],
    }).compile();

    controller = module.get<ForgotPassController>(ForgotPassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
