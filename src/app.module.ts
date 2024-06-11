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
// import { RolesGuard } from './auth/roles.guard';
import { URL } from 'url';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { AccessControlService } from './auth/access-contorl.service';
// import { CLOUD_DB } from './auth/constants';
import { ConfigModule } from '@nestjs/config';
import { loadEnvFile } from 'process';
import configurationApp from 'config/configuration-app';
//https://docs.nestjs.com/guards

const DB_ORIGIN = process.env.DB_CONFIG;

@Module({
  imports: [
    //https://stackoverflow.com/questions/54308318/how-to-get-the-configurations-from-within-a-module-import-in-nestjs
    //
    ConfigModule.forRoot({
      envFilePath: [
        `.env`,
        `env/.env.jwtConfig`,
        // `env/.env.dbConfig.remote`,
        // `env/.env.dbConfig.${DB_ORIGIN}`,
        !DB_ORIGIN
          ? 'env/.env.dbConfig.local'
          : `env/.env.dbConfig.${DB_ORIGIN}`,
      ],
      // envFilePath: [`env/.env.development.local`],
      // load: [configurationApp],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    // TypeOrmModule.forRoot({
    //   ...CONFIG,
    //   entities: ['dist/**/**.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // (!DB_ORIGIN? null: (ssl: true)),
      // ssl: true as any,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),
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
    { provide: APP_GUARD, useClass: RoleGuard },
    AppService,
    AccessControlService,
  ],
})
export class AppModule {}
// export class AppModule {
//   constructor(private readonly configService: ConfigService) {
//     // Aquí puedes acceder a la configuración y hacer cualquier inicialización necesaria
//     const databaseUrl = this.configService.get<string>('DATABASE_CONFIG');
//     console.log('Database URL:', databaseUrl);
//   }
// }
