import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column } from 'typeorm';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // readonly

  @Column()
  readonly phone?: string;

  @Column()
  readonly avatar?: string;
}
