import { Module } from '@nestjs/common';
import { TypeOfCourtService } from './type-of-court.service';
import { TypeOfCourtController } from './type-of-court.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfCourt } from './entities/type-of-court.entity';
import { Court } from 'src/court/entities/court.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TypeOfCourt,Court])],
  controllers: [TypeOfCourtController],
  providers: [TypeOfCourtService],
})
export class TypeOfCourtModule {}
