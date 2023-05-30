import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEntityDto } from '../dto/entity.dto';
import { EntityClass } from '../entities/entity.class';
import { IEntity } from '../interfaces/entity.interface';
import { Entity } from '../model/entity.model';

// Maneja los CRUDs del modulo (no deberia tener logica de negocio)

@Injectable()
export class ExampleRepository {

    constructor(
        @InjectModel(Entity)
        private entityModel: typeof Entity, //Se inyectan los diferentes modelos que use este modulo
    ) { }

    async createEntity(newEntity: CreateEntityDto): Promise<EntityClass> {
        //Create on database
        let newEntityRegister = await this.entityModel.create({
            firstField: newEntity.firstField,
            secondField: newEntity.secondField,
        });
        return new EntityClass(newEntityRegister.id, newEntityRegister.firstField, newEntityRegister.secondField);
    }

    async findEntityById(id: number): Promise<EntityClass> {
        //Create on database
        let entityRegister = await this.entityModel.findOne({
            where: {
                id: id
            }
        });
        return new EntityClass(entityRegister.id, entityRegister.firstField, entityRegister.secondField);
    }

    async findAllEntities(): Promise<EntityClass[]> {
        //Create on database
        let entityList = await this.entityModel.findAll({});
        let entityListClass: EntityClass[] = [];
        entityList.forEach(entity => {
            entityListClass.push(new EntityClass(entity.id, entity.firstField, entity.secondField));
        }
        );
        return entityListClass;
    }

    async deleteEntity(id: number): Promise<void> {
        //Delete on database
        const entity = await this.entityModel.findOne({
            where: {
                id: id
            }
        });
        await entity.destroy();
    }
}
