import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsDateString, IsString,  IsOptional, IsDate, IsPositive, IsBoolean, Min } from 'class-validator';
import { QueryBaseDto } from 'src/query-base.dto';
// import { Court } from 'src/court/entities/court.entity';
// import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
// import { User } from 'src/user/entities/user.entity';

export class QueryReservationDto extends PartialType(QueryBaseDto) {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly idUser: number;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(()=>Date)
  // @IsDateString({},{ message: 'El campo "Fecha y Hora" debe ser una cadena de texto.' })
  readonly timedate: Date;

  // @IsNotEmpty()
  // @IsNumber()
  // @IsPositive()
  // // @IsCurrency()
  // readonly price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  readonly idCourt: number;
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly idStatus: number;
}