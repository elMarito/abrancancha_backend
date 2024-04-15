import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClubDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  // Si tienes la columna para la tarifa, deberías agregarla aquí
}
