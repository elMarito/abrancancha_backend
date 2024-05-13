import {IsString } from 'class-validator';

export class CreateStatusOfReservationDto {
  @IsString()
  name:string;
  
}
