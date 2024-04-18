import { IsString, IsNumber,IsHash, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly fullname: string;

  @IsString()
  readonly email: string;
  
  @IsHash('sha256')
  @IsString()
  readonly password: string;

//   @IsHash()
// @IsOptional()
// @IsString()
//   readonly salt: string;

  // @IsOptional()
  // @IsString()
  // readonly phone: string;

  // @IsOptional()
  // @IsString()
  // readonly avatar: string;

//@IsInt()
  // @IsNumber()
  // readonly idStatus: number;
}
