// import { Reflector } from '@nestjs/core';

// export const Roles = Reflector.createDecorator<string[]>();



import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


// import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// export const ROLE_KEY = 'role';
// export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);