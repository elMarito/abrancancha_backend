import { Injectable } from '@nestjs/common';
import { CreateStatusOfUserDto } from './dto/create-status-of-user.dto';
import { UpdateStatusOfUserDto } from './dto/update-status-of-user.dto';

@Injectable()
export class StatusOfUserService {
  create(createStatusOfUserDto: CreateStatusOfUserDto) {
    return 'This action adds a new statusOfUser';
  }

  findAll() {
    return `This action returns all statusOfUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusOfUser`;
  }

  update(id: number, updateStatusOfUserDto: UpdateStatusOfUserDto) {
    return `This action updates a #${id} statusOfUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusOfUser`;
  }
}
