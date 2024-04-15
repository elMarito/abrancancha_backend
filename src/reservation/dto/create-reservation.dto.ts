import { IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  idCourt: number;

  @IsDateString()
  timedate: Date;

  @IsString()
  price: string;

  @IsString()
  idStatus: string;
}