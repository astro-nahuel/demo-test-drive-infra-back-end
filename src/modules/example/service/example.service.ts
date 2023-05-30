import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from '../dto/entity.dto';
import { EntityClass } from '../entities/entity.class';
import { ExampleRepository } from '../repositories/example.repository';

// Maneja la logica de negocio del modulo

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createEntity(newEntity: CreateEntityDto): Promise<EntityClass> {
    return await this.exampleRepository.createEntity({
      firstField: newEntity.firstField,
      secondField: newEntity.secondField,
    });
  }

  async getEntity(id: number): Promise<EntityClass> {
    return await this.exampleRepository.findEntityById(id);
  }

  async getEntitiesList(): Promise<EntityClass[]> {
    return this.exampleRepository.findAllEntities();
  }

  async deleteEntity(id: number): Promise<void> {
    return this.exampleRepository.deleteEntity(id);
  }
}
