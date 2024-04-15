import { IsString } from 'class-validator';

export class CreateStatusOfUserDto {
  @IsString()
  name: string;
}

