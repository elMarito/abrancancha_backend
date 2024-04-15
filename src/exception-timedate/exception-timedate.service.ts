import { Injectable } from '@nestjs/common';
import { CreateExceptionTimedateDto } from './dto/create-exception-timedate.dto';
import { UpdateExceptionTimedateDto } from './dto/update-exception-timedate.dto';

@Injectable()
export class ExceptionTimedateService {
  create(createExceptionTimedateDto: CreateExceptionTimedateDto) {
    return 'This action adds a new exceptionTimedate';
  }

  findAll() {
    return `This action returns all exceptionTimedate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exceptionTimedate`;
  }

  update(id: number, updateExceptionTimedateDto: UpdateExceptionTimedateDto) {
    return `This action updates a #${id} exceptionTimedate`;
  }

  remove(id: number) {
    return `This action removes a #${id} exceptionTimedate`;
  }
}
