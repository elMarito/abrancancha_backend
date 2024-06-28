import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// import { RolesGuard } from './auth/roles.guard';
// import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  require('dotenv').config({ path: [ '.env',"env/.env.jwtConfig"] })
  require('dotenv').config({ path: [ `env/.env.dbConfig.${process.env.DB_CONFIG}`] })
    
  // const configService = app.get(ConfigService);
  // const port = configService.get<number>('PORT');
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api'); // Agregar el prefijo '/api' a todas las rutas
  // const loggerInstance = app.get(Logger);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.useGlobalFilters(new HttpExceptionFilter());
  //  app.useGlobalGuards(new AuthGuard());
  // app.useGlobalGuards(new RolesGuard())

  const options = new DocumentBuilder()
    .setTitle('Abran Cancha')
    .setDescription('Api para la conexion a la DB de Abran Cancha')
    .setVersion('1.0')
    .addTag('abrancancha')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

 

  await app.listen(3000);
}
bootstrap();
