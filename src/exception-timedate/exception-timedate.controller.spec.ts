import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionTimedateController } from './exception-timedate.controller';
import { ExceptionTimedateService } from './exception-timedate.service';

describe('ExceptionTimedateController', () => {
  let controller: ExceptionTimedateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExceptionTimedateController],
      providers: [ExceptionTimedateService],
    }).compile();

    controller = module.get<ExceptionTimedateController>(ExceptionTimedateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
