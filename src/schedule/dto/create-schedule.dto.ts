import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';
import { Timetable } from 'src/timetable/entities/timetable.entity';

export class CreateScheduleDto {
  @IsNumber()
  dayOfWeek: number;

  @IsDate()
  @Type(()=>Date)
  timeFrom: Date;

  @IsDate()
  @Type(()=>Date)
  timeTo: Date;
  
  // @IsNumber()
  // idTimetable: number;
  // @IsNumber()
  timetable: Timetable;
}
