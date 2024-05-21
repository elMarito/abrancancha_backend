import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
import { TimetableService } from 'src/timetable/timetable.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Timetable])],
  controllers: [ScheduleController],
  providers: [ScheduleService, TimetableService],
})
export class ScheduleModule {}
