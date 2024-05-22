import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      
      return true
    //   return this.matchRoles(roles, user.roles);
    }
    
    private matchRoles(autorizedRoles: Role[],userRoles:Role[]): boolean {
        return true;
        // const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // return type === 'Bearer' ? token : undefined;
      }
  //   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
}
