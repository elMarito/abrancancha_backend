import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class CreateExceptionTimedateDto {
    @IsNumber()
    dayOfWeek: number;
  
    @IsDate()
    @Type(()=>Date)
    dateFrom: Date;
  
    @IsDate()
    @Type(()=>Date)
    dateTo: Date;
}
