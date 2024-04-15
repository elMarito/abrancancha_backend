import { Module } from '@nestjs/common';
import { StatusOfReservationService } from './status-of-reservation.service';
import { StatusOfReservationController } from './status-of-reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusOfReservation } from './entities/status-of-reservation.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StatusOfReservation, Reservation])],
  controllers: [StatusOfReservationController],
  providers: [StatusOfReservationService],
})
export class StatusOfReservationModule {}
