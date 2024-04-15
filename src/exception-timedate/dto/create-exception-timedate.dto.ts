import { IsNumber, IsDate } from 'class-validator';

export class CreateExceptionTimedateDto {
    @IsNumber()
    dayOfWeek: number;
  
    @IsDate()
    dateFrom: Date;
  
    @IsDate()
    dateTo: Date;
}
