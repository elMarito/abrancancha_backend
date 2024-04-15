import { Test, TestingModule } from '@nestjs/testing';
import { StatusOfReservationController } from './status-of-reservation.controller';
import { StatusOfReservationService } from './status-of-reservation.service';

describe('StatusOfReservationController', () => {
  let controller: StatusOfReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusOfReservationController],
      providers: [StatusOfReservationService],
    }).compile();

    controller = module.get<StatusOfReservationController>(StatusOfReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
