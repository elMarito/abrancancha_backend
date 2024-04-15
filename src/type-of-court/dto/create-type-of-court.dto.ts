import { IsString } from 'class-validator';

export class CreateTypeOfCourtDto {
  @IsString()
  name: string;
}
