import { Module } from '@nestjs/common';
import { ExceptionTimedateService } from './exception-timedate.service';
import { ExceptionTimedateController } from './exception-timedate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionTimedate } from './entities/exception-timedate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ExceptionTimedate])],
  controllers: [ExceptionTimedateController],
  providers: [ExceptionTimedateService],
})
export class ExceptionTimedateModule {}
