import { Type } from 'class-transformer';
import { IsNumber, IsDateString, IsString, IsCurrency, IsOptional, IsDate } from 'class-validator';
import { Court } from 'src/court/entities/court.entity';
import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateReservationDto {
  // @IsNumber()
  // readonly idUser: number;

  // @IsNumber()
  // readonly idCourt: number;

  readonly user: User;
  readonly court: Court;
  @IsOptional()
  readonly status: StatusOfReservation;

  @IsDate()
  @Type(()=>Date)
  // @IsDateString({},{ message: 'El campo "Fecha y Hora" debe ser una cadena de texto.' })
  readonly timedate: Date;

  @IsNumber()
  @IsCurrency()
  readonly price: number;

  // @IsNumber()
  // readonly idStatus: number;
}