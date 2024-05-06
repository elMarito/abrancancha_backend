import { PartialType } from '@nestjs/mapped-types';
import { CreateTariffDto } from './create-tariff.dto';

export class UpdateTariffDto extends PartialType(CreateTariffDto) {
   readonly id:number;
   readonly name:string;
   readonly price: number;
}
