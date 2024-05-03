import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOfCourtDto } from './create-type-of-court.dto';

export class UpdateTypeOfCourtDto extends PartialType(CreateTypeOfCourtDto) {

   readonly id:number;
   readonly name: string;
}
