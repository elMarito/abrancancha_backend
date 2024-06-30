import { Transform, Type } from 'class-transformer';
import { IsNumber, IsDateString, IsString, IsCurrency, IsOptional, IsDate, IsNotEmpty, IsPositive } from 'class-validator';
import { Court } from 'src/court/entities/court.entity';
import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly idUser: number;

  @IsNotEmpty()
  @IsNumber()
  readonly idCourt: number;

  // readonly user: User;
  // readonly court: Court;
  // @IsOptional()
  // readonly status: StatusOfReservation;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(()=>Date)
  // @IsDateString({},{ message: 'El campo "Fecha y Hora" debe ser una cadena de texto.' })
  readonly timedate: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  // @IsCurrency()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly idStatus: number;
}