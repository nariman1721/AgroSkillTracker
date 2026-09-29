// import { Controller } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {}

// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get()
//   findAll() {
//     return 'All cats';
//   }
// }

// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('breed')
//   getBreed() {
//     return 'Cat breed endpoint';
//   }
// }

// import { Controller, Get, Req } from '@nestjs/common';
// import type { Request } from 'express';

// @Controller('cats')
// export class CatsController {

//   @Get('headers')
//   getHeaders(@Req() req: Request) {
//     return req.headers;
//   }
// }

// import { Controller, Get, Headers } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('user-agent')
//   getUserAgent(@Headers('user-agent') userAgent: string) {
//     return {
//       userAgent,
//     };
//   }
// }

// import { Controller, Get, Headers } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('custom-headers')
//   getCustomHeaders(
//     @Headers('host') host: string,
//     @Headers('accept') accept: string,
//     @Headers('content-type') contentType: string,
//     @Headers('user-agent') userAgent: string,
//   ) {
//     return {
//       host,
//       accept,
//       contentType,
//       userAgent,
//     };
//   }
// }

//frontendlab2
// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get()
//   findAll() {
//     return 'nkuu';
//   }
// }


// import { Controller, Get, Redirect, Query } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('docs')
//   @Redirect('', 302)
//   redirectWithVersion(@Query('version') version: string) {

//   switch (version) {
//       case '5':
//         return { url: 'https://www.youtube.com' };
//       case '4':
//         return { url: 'https://nestjs.com' };
//       default:
//         return { url: 'https://google.com' };
//     }
//   }

// }
//http://localhost:8000/cats/docs?version=4

// import { Controller, Get, Redirect, Query } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('docs')
//   @Redirect('https://youtube.com', 302)
//   redirectToDocs() {
//     return;
//   }
// }
//http://localhost:8000/cats/docs


// import { Controller, Get } from '@nestjs/common';
// import { Param } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//  @Get(':id')
//   getCatById(@Param('id') id: string) {
//     return `Cat id: ${id}`;
//   }
// }
//http://localhost:8000/cats/7

// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//  @Get('async')
//   async asyncExample() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({ breed: 'Async response from NestJS 🚀' });
//       }, 1000);
//     });
//   }
// }
//http://localhost:8000/cats/async
// import { Controller, Get } from '@nestjs/common';
// import { Param } from '@nestjs/common';
// import { Headers } from '@nestjs/common';
// @Controller('cats')
// export class CatsController {

//   @Get('breed')
//   getBreed() {
//     return { message: "nkuu" };
//   }

//   @Get(':id')
//   getById(@Param('id') id: string) {
//     return { id };
//   }

//   @Get('headers/test')
//   getHeaders(@Headers() headers) {
//     return headers;
//   }
// }

// import { Controller, Get, Redirect, Query } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get('docs')
//   @Redirect('', 302)
//   redirectWithVersion(@Query('version') version: string) {

//   switch (version) {
//       case '5':
//         return { url: 'https://www.youtube.com' };
//       case '4':
//         return { url: 'https://nestjs.com' };
//       default:
//         return { url: 'https://google.com' };
//     }
//   }

// }
//http://localhost:8000/cats/docs?version=4

// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//  @Get('async')
//   async asyncExample() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({ breed: 'Async response from NestJS 🚀' });
//       }, 1000);
//     });
//   }
// }
//http://localhost:8000/cats/async


// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Headers,
//   Req,
//   Redirect,
//   Query
// } from '@nestjs/common';

// import type { Request } from 'express';
// import { CreateCatDto } from './dto/create-cat.dto';

// @Controller('cats')
// export class CatsController {

//   // ================================
//   // PART 1 – BASIC ROUTES
//   // ================================

//   @Get()
//   findAll() {
//     return { message: 'All cats' };
//   }

//   // endpoint for frontend (useEffect)
//   @Get('breed')
//   getBreed() {
//     return { message: 'nkuu' };
//   }

//   // ================================
//   // HEADERS
//   // ================================

//   @Get('headers')
//   getHeaders(@Req() req: Request) {
//     return req.headers;
//   }

//   @Get('headers/user-agent')
//   getUserAgent(@Headers('user-agent') userAgent: string) {
//     return { userAgent };
//   }

//   @Get('headers/custom')
//   getCustomHeaders(
//     @Headers('host') host: string,
//     @Headers('accept') accept: string,
//     @Headers('content-type') contentType: string,
//     @Headers('user-agent') userAgent: string,
//   ) {
//     return {
//       host,
//       accept,
//       contentType,
//       userAgent,
//     };
//   }

//   // ================================
//   // PART 2 – REDIRECT
//   // ================================

//   @Get('docs')
//   @Redirect('', 302)
//   redirectWithVersion(@Query('version') version: string) {

//     switch (version) {
//       case '5':
//         return { url: 'https://www.youtube.com' };

//       case '4':
//         return { url: 'https://nestjs.com' };

//       default:
//         return { url: 'https://google.com' };
//     }
//   }

//   // ================================
//   // DYNAMIC ROUTE
//   // ================================

//   @Get(':id')
//   getCatById(@Param('id') id: string) {
//     return {
//       message: 'Cat found',
//       id
//     };
//   }

//   // ================================
//   // ASYNC FUNCTION
//   // ================================

//   @Get('async/test')
//   async asyncExample() {

//     return new Promise(resolve => {

//       setTimeout(() => {
//         resolve({
//           message: 'Async response from NestJS 🚀'
//         });

//       }, 1000);

//     });

//   }

//   // ================================
//   // POST + DTO
//   // ================================

//   @Post()
//   createCat(@Body() createCatDto: CreateCatDto) {

//     return {
//       message: 'Cat created successfully',
//       data: createCatDto
//     };

//   }

//   // ================================
//   // MIDDLEWARE TEST ROUTE
//   // ================================

//   @Post('middleware-test')
//   testMiddleware(@Body() body) {

//     return {
//       message: 'Middleware test route',
//       receivedBody: body
//     };

//   }

// }

//lab5
// import { Controller, ForbiddenException, Get, UseFilters } from '@nestjs/common';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { HttpException, HttpStatus } from '@nestjs/common';

// @Controller('cats')
// @UseFilters(new HttpExceptionFilter())
// export class CatsController {
//   @Get()
//   findAll() {
//     throw new ForbiddenException('Доступ запрещён');
//   }
// }


// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { CatsService } from './cats.service';

// @Controller('cats')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}

//   @Get(':age')
//   findOne(@Param('age', ParseIntPipe) age: number) {
//     return this.catsService.findOne(age);
//   }
// }


// import { Controller, Get, Param, ParseIntPipe, UseFilters, HttpException, HttpStatus, Post } from '@nestjs/common';
// import { CatsService } from './cats.service';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { NarimanExceptionFilter } from '../common/filters/nariman-exception.filter';
// import { NarimanException } from '../common/exception/nariman.exception';

// @Controller('cats')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}

//   // GET /cats - получить всех котов
//   @Get()
//   findAll() {
//     return this.catsService.findAll();
//   }

//   // GET /cats/excep выбрасывает HttpException('forbidden', 403)
//   @Get('excep')
//   getException() {
//     return this.catsService.getException();
//   }

//   // GET /cats/custom выбрасывает с полным кастомным телом + error cause
//   @Get('custom')
//   getCustomException() {
//     return this.catsService.getCustomException();
//   }

//   // GET /cats/NarimanException выбрасывает кастомное NarimanException
//   @Get('NarimanException')
//   @UseFilters(new NarimanExceptionFilter())
//   getNarimanException() {
//     return this.catsService.getNarimanException();
//   }

//   // POST /cats использует HttpExceptionFilter
//   @Post()
//   @UseFilters(new HttpExceptionFilter())
//   createCat() {
//     // Здесь логика создания кота, но для демонстрации выбрасываем исключение
//     throw new HttpException(
//       {
//         status: HttpStatus.FORBIDDEN,
//         message: 'Невозможно создать кота без необходимых данных',
//         requiredFields: ['name', 'age', 'breed'],
//       },
//       HttpStatus.FORBIDDEN,
//     );
//   }

//   // GET /cats/:id  с ParseIntPipe
//   @Get(':age')
//   findOne(@Param('age', ParseIntPipe) age: number) {
//     return this.catsService.findOne(age);
//   }
// }


// import { Controller, Get, Param, ParseIntPipe, UseFilters, HttpException, HttpStatus, Post } from '@nestjs/common';
// import { CatsService } from './cats.service';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { Roles } from '../common/decorators/roles.decorator';

// @Controller('cats')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}
//   @Post()
//   @Roles(['admin'])
//   @UseFilters(HttpExceptionFilter)
//   createCat() {
//     throw new HttpException(
//       {
//         status: HttpStatus.FORBIDDEN,
//         message: 'Невозможно создать кота без необходимых данных',
//         requiredFields: ['name', 'age', 'breed'],
//       },
//       HttpStatus.FORBIDDEN,
//     );
//   }
// }



// import { 
//   Controller, 
//   Get, 
//   Post, 
//   Body, 
//   Param, 
//   ParseIntPipe, 
//   UseFilters, 
//   UseGuards,
//   HttpException, 
//   HttpStatus,
//   Query
// } from '@nestjs/common';
// import { CatsService } from './cats.service';
// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
// import { NarimanExceptionFilter } from '../common/filters/nariman-exception.filter';
// import { AuthGuard } from '../common/guards/auth.guard'; 
// import { RolesGuard } from '../common/guards/roles.guard'; 
// import { Roles } from '../common/decorators/roles.decorator';

// @Controller('cats')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}

//   // ==========================================
//   // ➕ НУЖНО ДОБАВИТЬ ЭТОТ МЕТОД
//   // ==========================================
  
//   // GET /cats - получить всех котов (лабораторная №5)
//   @Get()
//   findAll() {
//     return this.catsService.findAll();
//   }

//   // ==========================================
//   // PART 5: Исключения и Валидация (Pipes/Filters)
//   // ==========================================

//   @Get('debug/error')
//   @UseFilters(HttpExceptionFilter)
//   testFilter() {
//     throw new HttpException({
//       status: HttpStatus.I_AM_A_TEAPOT,
//       error: 'Время пить чай!',
//       timestamp: new Date().toISOString(),
//       path: '/cats/debug/error'
//     }, HttpStatus.I_AM_A_TEAPOT);
//   }

//   @Get('find/:age')
//   findOne(@Param('age', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) age: number) {
//     return this.catsService.findOne(age);
//   }

//   @Get('excep')
//   getException() {
//     return this.catsService.getException();
//   }

//   @Get('custom')
//   getCustomException() {
//     return this.catsService.getCustomException();
//   }

//   @Get('custom-exception')
//   @UseFilters(new NarimanExceptionFilter())
//   getNariman() {
//     return this.catsService.getNarimanException();
//   }

//   // POST /cats - использует HttpExceptionFilter (лабораторная №5)
//   @Post()
//   @UseFilters(HttpExceptionFilter)
//   createCat(@Body() body: any) {
//     throw new HttpException(
//       {
//         status: HttpStatus.FORBIDDEN,
//         message: 'Невозможно создать кота без необходимых данных',
//         requiredFields: ['name', 'age', 'breed'],
//       },
//       HttpStatus.FORBIDDEN,
//     );
//   }

  
//   // PART 6: Безопасность и Доступ (Guards/Roles)

//   @Post('admin/create')
//   @Roles(['ADMIN']) 
//   @UseGuards(AuthGuard, RolesGuard) 
//   createAdminCat(@Body() body: any) {
//     return {
//       message: 'Доступ администратора подтвержден',
//       data: body
//     };
//   }

//   @Get('secure/profile')
//   @UseGuards(AuthGuard)
//   getSecureData() {
//     return { info: "Секретные данные только для авторизованных котиков" };
//   }

//   @Post('moderate')
//   @Roles(['ADMIN', 'MODERATOR']) 
//   @UseGuards(AuthGuard, RolesGuard)
//   moderateContent() {
//     return "Контент успешно отмодерирован";
//   }
// }


import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  ParseIntPipe, 
  UseFilters, 
  UseGuards,
  HttpException, 
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { NarimanExceptionFilter } from '../common/filters/nariman-exception.filter';
import { AuthGuard } from '../common/guards/auth.guard'; 
import { RolesGuard } from '../common/guards/roles.guard'; 
import { Roles } from '../common/decorators/roles.decorator';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // ==========================================
  // PART 5: Исключения и Валидация (Pipes/Filters)
  // ==========================================

  // GET /cats - получить всех котов (лабораторная №5)
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  // GET /cats/excep - HttpException('forbidden', 403)
  @Get('excep')
  getException() {
    return this.catsService.getException();
  }

  // GET /cats/custom - полный кастомный body + error cause
  @Get('custom')
  getCustomException() {
    return this.catsService.getCustomException();
  }

  // GET /cats/custom-exception - кастомное исключение NarimanException
  @Get('custom-exception')
  @UseFilters(NarimanExceptionFilter)
  getNariman() {
    return this.catsService.getNarimanException();
  }

  // GET /cats/find/:age - с ParseIntPipe
  @Get('find/:age')
  findOne(@Param('age', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) age: number) {
    return this.catsService.findOne(age);
  }

  // GET /cats/debug/error - тест кастомного фильтра
  @Get('debug/error')
  @UseFilters(HttpExceptionFilter)
  testFilter() {
    throw new HttpException({
      status: HttpStatus.I_AM_A_TEAPOT,
      error: 'Время спасать город!',
      timestamp: new Date().toISOString(),
      path: '/cats/debug/error'
    }, HttpStatus.I_AM_A_TEAPOT);
  }

  // POST /cats - использует HttpExceptionFilter (лабораторная №5)
  @Post()
  @UseFilters(HttpExceptionFilter)
  createCat(@Body() body: any) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Невозможно создать кота без необходимых данных',
        requiredFields: ['name', 'age', 'breed'],
      },
      HttpStatus.FORBIDDEN,
    );
  }

  // ==========================================
  // PART 6: Безопасность и Доступ (Guards/Roles)
  // ==========================================

  // POST /cats/admin/create - требует роль ADMIN (исправлено: передаем одну строку)
  @Post('admin/create')
  @Roles('ADMIN')  // ✅ Исправлено: string вместо string[]
  @UseGuards(AuthGuard, RolesGuard) 
  createAdminCat(@Body() body: any) {
    return {
      message: 'Доступ администратора подтвержден',
      data: body
    };
  }

  // GET /cats/secure/profile - требует авторизацию (любого пользователя)
  @Get('secure/profile')
  @UseGuards(AuthGuard)
  getSecureData() {
    return { info: "Секретные данные только для авторизованных котиков" };
  }

  // POST /cats/moderate - требует роль ADMIN или MODERATOR (исправлено: несколько ролей через запятую)
  @Roles('ADMIN', 'MODERATOR')  // ✅ Исправлено: несколько аргументов вместо массива
  @UseGuards(AuthGuard, RolesGuard)
  @Post('moderate')
  moderateContent() {
    return "Контент успешно отмодерирован";
  }
}

// # ==========================================
// # ЛАБОРАТОРНАЯ №5 (не требуют токена)
// # ==========================================

// # 1. GET /cats - все коты
// curl -X GET http://localhost:8000/cats

// # 2. GET /cats/excep - HttpException 403
// curl -X GET http://localhost:8000/cats/excep

// # 3. GET /cats/custom - кастомное тело ошибки
// curl -X GET http://localhost:8000/cats/custom

// # 4. GET /cats/custom-exception - кастомное исключение
// curl -X GET http://localhost:8000/cats/custom-exception

// # 5. GET /cats/find/3 - успешный поиск (Response A)
// curl -X GET http://localhost:8000/cats/find/3

// # 6. GET /cats/find/10 - кот не найден (Response B)
// curl -X GET http://localhost:8000/cats/find/10

// # 7. GET /cats/find/abc - ошибка валидации (406 Not Acceptable)
// curl -X GET http://localhost:8000/cats/find/abc

// # 8. GET /cats/debug/error - тест фильтра (418 I'm a teapot)
// curl -X GET http://localhost:8000/cats/debug/error

// # 9. POST /cats - тест фильтра (403 Forbidden)
// curl -X POST http://localhost:8000/cats \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Тест"}'

// # ==========================================
// # ЛАБОРАТОРНАЯ №6 (требуют токен)
// # ==========================================

// # 10. GET /cats/secure/profile - БЕЗ токена (должен вернуть 403)
// curl -X GET http://localhost:8000/cats/secure/profile

// # 11. GET /cats/secure/profile - С токеном (должен вернуть данные)
// curl -X GET http://localhost:8000/cats/secure/profile \
//   -H "Authorization: Bearer my-secret-token"

// # 12. POST /cats/admin/create - С токеном и ролью ADMIN
// curl -X POST http://localhost:8000/cats/admin/create \
//   -H "Authorization: Bearer my-secret-token" \
//   -H "role: ADMIN" \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Админский кот"}'

// # 13. POST /cats/admin/create - С токеном, но НЕ ADMIN (должен вернуть 403)
// curl -X POST http://localhost:8000/cats/admin/create \
//   -H "Authorization: Bearer my-secret-token" \
//   -H "role: USER" \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Обычный кот"}'

// # 14. POST /cats/moderate - С токеном и ролью MODERATOR
// curl -X POST http://localhost:8000/cats/moderate \
//   -H "Authorization: Bearer my-secret-token" \
//   -H "role: MODERATOR" \
//   -H "Content-Type: application/json" \
//   -d '{}'

// # 15. POST /cats/moderate - С токеном и ролью ADMIN (тоже должен работать)
// curl -X POST http://localhost:8000/cats/moderate \
//   -H "Authorization: Bearer my-secret-token" \
//   -H "role: ADMIN" \
//   -H "Content-Type: application/json" \
//   -d '{}'