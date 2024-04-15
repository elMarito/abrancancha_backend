import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';
import { Court } from 'src/court/entities/court.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tariff,Court])],
  controllers: [TariffController],
  providers: [TariffService],
})
export class TariffModule {}
