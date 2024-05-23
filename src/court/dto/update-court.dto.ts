import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtDto } from './create-court.dto';
import { Tariff } from 'src/tariff/entities/tariff.entity';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
   
    
}
//Todos estos parametros los cree para que funcione el create pero no estan enlazados
//a ninguna de las otras entidades, no esta correcto.