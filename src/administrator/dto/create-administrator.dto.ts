import { IsNumber } from 'class-validator';

export class CreateAdministratorDto {
  @IsNumber()
  readonly idUser: number;
}
