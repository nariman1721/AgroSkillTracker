// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }

//   private validateRequest(request: any): boolean {
//     // Check for a token in the Authorization header
//     const token = request.headers['authorization'];
//     return !!token; // returns true if token exists, false if not
//   }
// }


import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Публичные маршруты (не требуют авторизации)
    const publicRoutes = [
      { method: 'GET', path: '/cats' },
      { method: 'GET', path: '/cats/excep' },
      { method: 'GET', path: '/cats/custom' },
      { method: 'GET', path: '/cats/custom-exception' },
      { method: 'GET', path: '/cats/debug/error' },
      { method: 'GET', path: '/cats/find' },
      { method: 'POST', path: '/cats' },  
    ];
    
    // Проверяем, публичный ли маршрут
    for (const route of publicRoutes) {
      if (request.method === route.method && request.url.startsWith(route.path)) {
        return true; // Пропускаем без проверки
      }
    }
    
    // Для остальных маршрутов - проверяем токен
    const token = request.headers.authorization;
    
    // Проверка наличия токена
    if (!token) {
      return false; // Нет токена - доступ запрещен
    }
    
    // Здесь должна быть логика проверки валидности токена
    // Например: validateToken(token)
    const isValidToken = this.validateToken(token);
    
    return isValidToken; // Возвращаем результат проверки
  }

  // Метод для проверки токена (можно расширить)
  private validateToken(token: string): boolean {
    // Простая проверка: токен должен начинаться с 'Bearer '
    if (!token.startsWith('Bearer ')) {
      return false;
    }
    
    const actualToken = token.substring(7); // Убираем 'Bearer '
    
    // TODO: Добавить реальную логику проверки JWT токена
    // Например, проверка через JWT сервис
    
    // Временная заглушка: разрешаем любой непустой токен
    return actualToken.length > 0;
  }
}