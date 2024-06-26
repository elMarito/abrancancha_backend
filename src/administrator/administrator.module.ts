import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessControlService } from 'src/auth/access-contorl.service';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator, User])],
  controllers: [AdministratorController],
  providers: [AdministratorService, UserService/* , AccessControlService */],
})
export class AdministratorModule {}
