import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Court } from 'src/court/entities/court.entity';
import { StatusOfReservation } from 'src/status-of-reservation/entities/status-of-reservation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Court,StatusOfReservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
