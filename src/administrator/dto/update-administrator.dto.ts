import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministratorDto } from './create-administrator.dto';

export class UpdateAdministratorDto extends PartialType(CreateAdministratorDto) {}


// import { IsOptional, IsNumber } from 'class-validator';

// export class UpdateAdministrator {
//   @IsOptional()
//   @IsNumber()
//   readonly idUser?: number;
// }
