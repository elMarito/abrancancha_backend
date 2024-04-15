import { Module } from '@nestjs/common';
import { StatusOfCourtService } from './status-of-court.service';
import { StatusOfCourtController } from './status-of-court.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusOfCourt } from './entities/status-of-court.entity';
import { Court } from 'src/court/entities/court.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StatusOfCourt,Court])],
  controllers: [StatusOfCourtController],
  providers: [StatusOfCourtService],
})
export class StatusOfCourtModule {}
