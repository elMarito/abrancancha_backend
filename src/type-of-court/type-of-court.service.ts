import { Injectable } from '@nestjs/common';
import { CreateTypeOfCourtDto } from './dto/create-type-of-court.dto';
import { UpdateTypeOfCourtDto } from './dto/update-type-of-court.dto';

@Injectable()
export class TypeOfCourtService {
  create(createTypeOfCourtDto: CreateTypeOfCourtDto) {
    return 'This action adds a new typeOfCourt';
  }

  findAll() {
    return `This action returns all typeOfCourt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOfCourt`;
  }

  update(id: number, updateTypeOfCourtDto: UpdateTypeOfCourtDto) {
    return `This action updates a #${id} typeOfCourt`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfCourt`;
  }
}
