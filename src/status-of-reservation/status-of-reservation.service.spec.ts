import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfReservationService } from './status-of-reservation.service';

describe('StatusOfReservationService', () => {
  let service: StatusOfReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusOfReservationService],
    }).compile();

    service = module.get<StatusOfReservationService>(StatusOfReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
