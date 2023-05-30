import { Module } from '@nestjs/common';
import { ExampleController } from './controller/example.controller';
import { ExampleService } from './service/example.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Entity } from './model/entity.model';
import { ExampleRepository } from './repositories/example.repository';

@Module({
    imports: [SequelizeModule.forFeature([Entity])],// Importa el modelo Entity para poder usarlo en el servicio
    controllers: [ExampleController],
    providers: [ExampleService, ExampleRepository], //Permite la injeción de dependencias en el controlador y en el servicio
    exports: [
        ExampleService,
        SequelizeModule
    ], //Permite usar la instancia de ExampleService(singleton) en otros módulos de la aplicación
})
export class ExampleModule { }