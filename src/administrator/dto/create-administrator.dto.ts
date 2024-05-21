import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateAdministratorDto extends CreateUserDto {}
// export class CreateAdministratorDto {
//   @IsNumber()
//   readonly idUser: number;
// }
