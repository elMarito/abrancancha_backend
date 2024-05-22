import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusOfReservationDto } from './create-status-of-reservation.dto';

export class UpdateStatusOfReservationDto extends PartialType(CreateStatusOfReservationDto) {
    
    readonly idStatus:number;
}
