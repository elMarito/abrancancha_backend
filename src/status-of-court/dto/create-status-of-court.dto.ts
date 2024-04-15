import { IsString } from 'class-validator';

export class CreateStatusOfCourtDto {
  @IsString()
  name: string;
}
