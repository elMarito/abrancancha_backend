import { IsString } from "class-validator";
import { Schedule } from "src/schedule/entities/schedule.entity";

export class CreateTimetableDto {  
    @IsString()
    readonly name: string;
    
    readonly schedules: Schedule[];
}
