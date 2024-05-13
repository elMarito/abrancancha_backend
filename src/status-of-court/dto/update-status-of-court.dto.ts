import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusOfCourtDto } from './create-status-of-court.dto';

export class UpdateStatusOfCourtDto extends PartialType(CreateStatusOfCourtDto) {
   readonly id:number;
   readonly name:string;
}
