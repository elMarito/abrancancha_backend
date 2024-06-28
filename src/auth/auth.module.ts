import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      secret: `${process.env.JWT_SECRET}`,
      // secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // providers: [
  //   { provide: APP_GUARD, useClass: AuthGuard },
  //   { provide: APP_GUARD, useClass: RoleGuard }, AppService,AccessControlService],
  exports: [AuthService],
})
export class AuthModule {}
