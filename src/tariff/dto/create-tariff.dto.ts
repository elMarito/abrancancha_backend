import { IsString, IsNumber } from 'class-validator';

export class CreateTariffDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}

