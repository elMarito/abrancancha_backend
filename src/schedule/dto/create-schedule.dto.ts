import { IsNumber, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  idTimetable: number;

  @IsNumber()
  dayOfWeek: number;

  @IsDate()
  timeFrom: Date;

  @IsDate()
  timeTo: Date;
}
