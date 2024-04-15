import { Injectable } from '@nestjs/common';
import { CreateStatusOfCourtDto } from './dto/create-status-of-court.dto';
import { UpdateStatusOfCourtDto } from './dto/update-status-of-court.dto';

@Injectable()
export class StatusOfCourtService {
  create(createStatusOfCourtDto: CreateStatusOfCourtDto) {
    return 'This action adds a new statusOfCourt';
  }

  findAll() {
    return `This action returns all statusOfCourt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusOfCourt`;
  }

  update(id: number, updateStatusOfCourtDto: UpdateStatusOfCourtDto) {
    return `This action updates a #${id} statusOfCourt`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusOfCourt`;
  }
}
