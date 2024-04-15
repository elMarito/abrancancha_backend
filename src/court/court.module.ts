import { Module } from '@nestjs/common';
import { CourtService } from './court.service';
import { CourtController } from './court.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { TypeOfCourt } from 'src/type-of-court/entities/type-of-court.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { Tariff } from 'src/tariff/entities/tariff.entity';
import { StatusOfCourt } from 'src/status-of-court/entities/status-of-court.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Court, Reservation,TypeOfCourt,Timetable,Tariff,StatusOfCourt])],
  controllers: [CourtController],
  providers: [CourtService],
})
export class CourtModule {}
