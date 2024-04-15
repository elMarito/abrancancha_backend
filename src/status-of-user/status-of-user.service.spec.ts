import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfUserService } from './status-of-user.service';

describe('StatusOfUserService', () => {
  let service: StatusOfUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusOfUserService],
    }).compile();

    service = module.get<StatusOfUserService>(StatusOfUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
