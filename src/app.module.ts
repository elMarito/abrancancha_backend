import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//---------entidades ▼
import { UserModule } from './user/user.module';
import { AdministratorModule } from './administrator/administrator.module';
import { ClubModule } from './club/club.module';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOfCourtModule } from './type-of-court/type-of-court.module';
import { CourtModule } from './court/court.module';
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

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { URL } from 'url';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { AccessControlService } from './auth/access-contorl.service';
import { DB } from './auth/constants';
//https://docs.nestjs.com/guards

//$env:DATABASE_URL = "postgresql://mario:92xqM3KxqKKrTMDDTgMDQA@gloomy-dryad-14679.7tt.aws-us-east-1.cockroachlabs.cloud:26257/abranCancha?sslmode=verify-full"
//const DATABASE_URL = "postgresql://mario:92xqM3KxqKKrTMDDTgMDQA@gloomy-dryad-14679.7tt.aws-us-east-1.cockroachlabs.cloud:26257/abranCancha?sslmode=verify-full"
// const dbUrl = new URL(process.env.DATABASE_URL);
// const routingId = dbUrl.searchParams.get("options");
// dbUrl.searchParams.delete("options");

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'abranCancha',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),
    // TypeOrmModule.forRoot({
    //   type: "cockroachdb",
    // //   url: dbUrl.toString(),
    //   host: DB.HOST,
    //   port: DB.PORT,
    //   username: DB.USERNAME,
    //   password: DB.PASSWORD,
    //   database: DB.NAME,
    //   ssl: true,
    //   entities: ['dist/**/**.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    AuthModule,
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
  ],
  controllers: [AppController],
  // providers: [AppService],
  // providers: [ AppService, AuthGuard],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard }, AppService,AccessControlService],
})
export class AppModule {}