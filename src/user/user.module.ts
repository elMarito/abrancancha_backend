import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { StatusOfUser } from 'src/status-of-user/entities/status-of-user.entity';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { AccessControlService } from 'src/auth/access-contorl.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Reservation, StatusOfUser, Administrator]),
  ],
  controllers: [UserController],
  providers: [UserService/* , AccessControlService */],
  exports: [UserService], //<-para poder usar en auth
})
export class UserModule {}
