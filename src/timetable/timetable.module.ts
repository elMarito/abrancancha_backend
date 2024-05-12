import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Court } from 'src/court/entities/court.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable, Schedule/* , Court */])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
