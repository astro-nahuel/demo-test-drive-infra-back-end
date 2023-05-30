import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEntityDto } from '../dto/entity.dto';
import { ExampleService } from '../service/example.service';
import { IEntity } from '../interfaces/entity.interface';
import { ApiTags } from '@nestjs/swagger';
import { EntityClass } from '../entities/entity.class';

// Maneja las rutas del modulo y logica de negocio a nivel macro (solo cuando existe comunicacion entre diferentes modulos)

@Controller('entity')
@ApiTags('Entity') // Tag para el swagger
export class ExampleController {
  constructor(private readonly entityService: ExampleService) { }

  @Get()//GET /entity
  async getEntity(): Promise<IEntity[]> {
    let entities: EntityClass[] = await this.entityService.getEntitiesList();
    let entity: EntityClass = entities[0]
    console.log(`El primer campo es ${entity.firstField}`)
    entity.setFirstField('Cambio el valor')
    console.log(`El primer campo es ${entity.firstField}`)
    //Aca podriamos guardar la entidad modificada por ejemplo
    return entities;
  }

  @Get(':id')//GET /entity/{id}
  async getEntityById(@Param('id') id: number): Promise<IEntity> {
    console.log(`El id es ${id}`)
    return await this.entityService.getEntity(id);
  }

  @Get('example') //GET /entity/example
  async getExample(): Promise<string> {
    return this.entityService.getHello();
  }

  @Post() //POST /entity
  async createEntity(@Body() createEntityBody: CreateEntityDto): Promise<IEntity> {
    return this.entityService.createEntity(createEntityBody);
  }

}
