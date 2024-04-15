import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionTimedateService } from './exception-timedate.service';

describe('ExceptionTimedateService', () => {
  let service: ExceptionTimedateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionTimedateService],
    }).compile();

    service = module.get<ExceptionTimedateService>(ExceptionTimedateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
