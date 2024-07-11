import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsDateString,
  IsString,
  IsOptional,
  IsDate,
  IsPositive,
  IsBoolean,
  Min,
} from 'class-validator';
import { QueryBaseDto } from 'src/query-base.dto';
// import { Court } from 'src/court/entities/court.entity';
// import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';
// import { User } from 'src/user/entities/user.entity';

export class QueryCourtDto extends PartialType(QueryBaseDto) {
  //   @IsOptional()
  //   @IsString()
  //   readonly numb: string;

  //   @IsOptional()
  //   @IsString()
  //   readonly name: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly idType: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly idTimetable: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly idTariff: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly rating: number;

  @IsOptional()
  @IsString()
  readonly observations: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly idStatus: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Min(0)
  readonly active: boolean;
}
