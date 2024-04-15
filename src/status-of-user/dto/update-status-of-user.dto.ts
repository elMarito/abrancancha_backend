import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusOfUserDto } from './create-status-of-user.dto';

export class UpdateStatusOfUserDto extends PartialType(CreateStatusOfUserDto) {}
