import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfCourtController } from './status-of-court.controller';
import { StatusOfCourtService } from './status-of-court.service';

describe('StatusOfCourtController', () => {
  let controller: StatusOfCourtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusOfCourtController],
      providers: [StatusOfCourtService],
    }).compile();

    controller = module.get<StatusOfCourtController>(StatusOfCourtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
