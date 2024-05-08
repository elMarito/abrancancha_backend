import { IsNumber, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateExceptionTimedateDto } from './create-exception-timedate.dto';

export class UpdateExceptionTimedateDto extends PartialType(CreateExceptionTimedateDto) {
    
     id: number;
}
