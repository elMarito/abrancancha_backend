import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfCourtService } from './status-of-court.service';

describe('StatusOfCourtService', () => {
  let service: StatusOfCourtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusOfCourtService],
    }).compile();

    service = module.get<StatusOfCourtService>(StatusOfCourtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
