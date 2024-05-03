import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';

// export class UpdateClubDto extends PartialType(CreateClubDto) {}

import { IsString, IsOptional } from 'class-validator';

export class UpdateClubDto {
    
  readonly id:number;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  // Si tienes la columna para la tarifa, deberías agregarla aquí
}
