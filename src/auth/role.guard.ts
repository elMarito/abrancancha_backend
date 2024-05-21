import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { AccessControlService } from './access-contorl.service';
// import { ROLE_KEY } from 'src/decorators/roles.decorator';
// import { Role } from 'src/enums/role.enum';
// import { AccessContorlService } from 'src/shared/access-control.service';

export class TokenDto {
  sub: number;
  email: string;
  role: Role;
}
// export class TokenDto {
//   id: number;
//   role: Role;
// }

@Injectable()//AuthorizationGuard
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //-esto lo copie de authguard
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    //-esto lo copie de authguard

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log("the required roles are",requiredRoles);    

    const request = context.switchToHttp().getRequest();
    // throw new Error("hola "+  request['token']+"---") 
    const token = request['token'] as TokenDto;
console.log("the guards are:",requiredRoles,"the current user roles are",token.role);    
    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: token.role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}