import { IsNumber, IsDate } from 'class-validator';
import { Timetable } from 'src/timetable/entities/timetable.entity';

export class CreateScheduleDto {
  @IsNumber()
  dayOfWeek: number;

  @IsDate()
  timeFrom: Date;

  @IsDate()
  timeTo: Date;
  
  // @IsNumber()
  // idTimetable: number;
  @IsNumber()
  timetable: Timetable;
}
