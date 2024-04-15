import { Module } from '@nestjs/common';
import { StatusOfUserService } from './status-of-user.service';
import { StatusOfUserController } from './status-of-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusOfUser } from './entities/status-of-user.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StatusOfUser,User])],
  controllers: [StatusOfUserController],
  providers: [StatusOfUserService],
})
export class StatusOfUserModule {}
