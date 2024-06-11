// src/court/dto/create-court.dto.ts
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourtDto {
  @IsString()
  readonly numb: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly idTariff: number;

  @IsNumber()
  readonly idType: number;

  @IsNumber()
  readonly idTimetable: number;

  @IsNumber()
  @IsOptional()
  readonly rating?: number;

  @IsString()
  @IsOptional()
  readonly observations?: string;

  @IsNumber()
  readonly idStatus: number;

  @IsOptional()
  @IsBoolean()
  readonly active?:boolean;


}

