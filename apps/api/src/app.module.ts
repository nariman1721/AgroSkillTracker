// import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
// import { CatsModule } from './cats/cats.module';

// import { LoggerMiddleware } from './common/middlewares/logger.middleware';
// import { ResponseLoggedMiddleware } from './common/middlewares/response.middleware';
// import { DogsModule } from './dogs/dogs.module';

// @Module({
//   imports: [CatsModule, DogsModule],
// })
// export class AppModule implements NestModule {

//   configure(consumer: MiddlewareConsumer) {

//     consumer
//       .apply(LoggerMiddleware, ResponseLoggedMiddleware)
//       .forRoutes('*');

//   }

// }

// import { Module } from '@nestjs/common';
// import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';

// @Module({
//   imports: [],
//   controllers: [CatsController],
//   providers: [CatsService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [CatsModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}