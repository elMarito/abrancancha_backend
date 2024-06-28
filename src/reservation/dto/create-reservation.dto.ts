import { Transform, Type } from 'class-transformer';
import { IsNumber, IsDateString, IsString, IsCurrency, IsOptional, IsDate, IsNotEmpty, IsPositive } from 'class-validator';
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


  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsDateString()
  readonly timedate: string;

  
 
  // @IsNumber()
  // readonly idStatus: number;
}