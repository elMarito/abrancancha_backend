import {  Injectable,  CanActivate,} from '@nestjs/common';
import {  ExecutionContext,  UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private jwtService: JwtService) {}
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  /* El siguiente método es la parte central del guardia de autenticación. AuthGuard implementa la interfaz CanActivate de NestJS. Esta función es llamada automáticamente por NestJS antes de permitir el acceso a una ruta protegida. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // debugger
      const payload = await this.jwtService.verifyAsync(token, {
        // secret: jwtConstants.secret,
        secret: `${process.env.JWT_SECRET}`,
        // secret:  this.configService.get<string>('jwtSecret');
      });
      // request['user'] = payload;
      request['token'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  /* Este es un método privado utilizado por canActivate para extraer el token de autorización del encabezado "Authorization" de la solicitud HTTP. Si el encabezado de autorización no está presente o no contiene el formato adecuado, este método devuelve undefined.*/

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
