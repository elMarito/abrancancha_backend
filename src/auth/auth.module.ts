import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigService,
    UserModule,
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      secret: 'Super_$_S3cr3et_#_Key_@_123',
      // secret: `${process.env.JWT_SECRET}`,
      // secret: this.configService.get<string>('jwtSecret'),
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
