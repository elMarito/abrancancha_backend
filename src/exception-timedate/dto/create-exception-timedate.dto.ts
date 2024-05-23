import { Transform, Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateExceptionTimedateDto {
  @IsNumber()
  readonly dayOfWeek: number;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(() => Date)
  readonly dateFrom: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Type(() => Date)
  readonly dateTo: Date;
}