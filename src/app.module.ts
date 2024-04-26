import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdministratorModule } from './administrator/administrator.module';
import { ClubModule } from './club/club.module';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOfCourtModule } from './type-of-court/type-of-court.module';
import { CourtModule } from './court/court.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StatusOfUserModule } from './status-of-user/status-of-user.module';
import { TariffModule } from './tariff/tariff.module';
import { TimetableModule } from './timetable/timetable.module';
import { StatusOfReservationModule } from './status-of-reservation/status-of-reservation.module';
import { StatusOfCourtModule } from './status-of-court/status-of-court.module';
import { ExceptionTimedateModule } from './exception-timedate/exception-timedate.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { StatusOfUser } from './status-of-user/entities/status-of-user.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'abranCancha',
      entities: [        
        "dist/**/**.entity{.ts,.js}"
      ],
      synchronize: false,
    }),
    UserModule,
    AdministratorModule,
    ClubModule,
    ReservationModule,
    TypeOfCourtModule,
    CourtModule,
    StatusOfUserModule,
    TariffModule,
    TimetableModule,
    StatusOfReservationModule,
    StatusOfCourtModule,
    ExceptionTimedateModule,
    ScheduleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
