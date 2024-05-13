import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Court } from 'src/court/entities/court.entity';
import { ScheduleService } from 'src/schedule/schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable, Schedule /* , Court */])],
  controllers: [TimetableController],
  providers: [TimetableService, ScheduleService],
})
export class TimetableModule {}
