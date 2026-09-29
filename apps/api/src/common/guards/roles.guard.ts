// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Roles } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     // If no roles required, allow all
//     if (!requiredRoles) return true;

//     const request = context.switchToHttp().getRequest();
//     // In a real app, you'd get this from a JWT token. For demo:
//     const userRole = request.headers['role'];
//     return requiredRoles.includes(userRole);
//   }
// }


// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
    
//     if (!requiredRoles) return true;
    
//     const request = context.switchToHttp().getRequest();
//     const user = (request as any).user;
    
//     if (!user || !user.roles) return false;
    
//     return requiredRoles.some(role => user.roles.includes(role));
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // Если роли не требуются - пропускаем всех
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    // Получаем роль пользователя из заголовка (для тестирования)
    // В реальном проекте роль берется из JWT токена
    const userRole = request.headers['role'] as string;
    
    // Проверяем, есть ли у пользователя требуемая роль
    return requiredRoles.includes(userRole);
  }
}