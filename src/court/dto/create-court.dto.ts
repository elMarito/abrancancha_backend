import { Type } from "@nestjs/common";
import { Tariff } from "src/tariff/entities/tariff.entity";
import { TypeOfCourt } from "src/type-of-court/entities/type-of-court.entity";

export class CreateCourtDto {
    readonly numb: string;
    readonly name:string;
    readonly idTariff:number;
    readonly idType:number;
    readonly idTimetable:number;
    readonly rating:string;
    readonly observations:string;
    readonly idStatus:number;
    
}
