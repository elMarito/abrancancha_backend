import { Injectable } from '@nestjs/common';
import { CreateStatusOfReservationDto } from './dto/create-status-of-reservation.dto';
import { UpdateStatusOfReservationDto } from './dto/update-status-of-reservation.dto';

@Injectable()
export class StatusOfReservationService {
  create(createStatusOfReservationDto: CreateStatusOfReservationDto) {
    return 'This action adds a new statusOfReservation';
  }

  findAll() {
    return `This action returns all statusOfReservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusOfReservation`;
  }

  update(id: number, updateStatusOfReservationDto: UpdateStatusOfReservationDto) {
    return `This action updates a #${id} statusOfReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusOfReservation`;
  }
}
