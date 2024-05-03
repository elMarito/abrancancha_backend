import { IsString, IsNumber } from 'class-validator';

export class CreateTariffDto {
  readonly id:number;
   readonly name:string;
   readonly price: number;
}

