import { IsString, IsNumber } from 'class-validator';

export class CreateTariffDto {
   readonly name:string;
   readonly price: number;
}

