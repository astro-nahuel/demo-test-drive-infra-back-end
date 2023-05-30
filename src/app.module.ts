import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';
import { CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ExampleController } from './modules/example/controller/example.controller';
import { AuthenticationMiddleware } from './middlewares/authentication.middlewar';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import dbConnection from './config/database/connection';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    dbConnection,
    ExampleModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'entity', method: RequestMethod.GET }//Excluimos la ruta GET /entity
      )
      .forRoutes(ExampleController)//Definimos donde implementar el middleware, en este caso a todas las rutas del controller EntityController
      // Otra opcion es usar el metodo apply() sin parametros, en este caso se implementara en todas las rutas de la aplicacion
      // Otra opcion es solo incluir las rutas que queremos en lugar de todo el controller
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'entity', method: RequestMethod.GET })
  }

}
