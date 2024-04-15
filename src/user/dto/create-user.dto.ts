import { IsString, IsNumber,IsHash, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly fullname: string;

  //@IsHash()
  @IsString()
  readonly passwordHash: string;

//   @IsHash()
  @IsString()
  readonly salt: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  // @IsNumber()
  // readonly idStatus: number;
}
