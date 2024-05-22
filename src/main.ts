import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const loggerInstance = app.get(Logger);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.useGlobalFilters(new HttpExceptionFilter());
  //  app.useGlobalGuards(new AuthGuard());
  // app.useGlobalGuards(new RolesGuard())
  await app.listen(3000);
}
bootstrap();
