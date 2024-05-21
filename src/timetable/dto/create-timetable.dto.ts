import { IsString } from "class-validator";
import { Schedule } from "src/schedule/entities/schedule.entity";

export class CreateTimetableDto {  
    @IsString()
    readonly name: string;
    
    readonly schedules: {"dayOfWeek":number,"timeFrom":Date,"timeTo":Date}[];
    // readonly schedules: Schedule[];
}
