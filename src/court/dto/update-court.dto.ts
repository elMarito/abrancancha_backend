import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtDto } from './create-court.dto';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
    readonly id:number;
    readonly numb: string;
    readonly name:string;
    readonly idTariff:number;
    readonly idType:number;
    readonly idTimetable:number;
    readonly rating:string;
    readonly observations:string;
    readonly idStatus:number;
    
}
//Todos estos parametros los cree para que funcione el create pero no estan enlazados
//a ninguna de las otras entidades, no esta correcto.