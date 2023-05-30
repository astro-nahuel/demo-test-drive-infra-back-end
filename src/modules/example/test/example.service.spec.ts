import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from '../controller/example.controller';
import { ExampleService } from '../service/example.service';
import { getModelToken } from '@nestjs/sequelize';
import { Entity } from '../model/entity.model';
import { IEntity } from '../interfaces/entity.interface';
import { ExampleRepository } from '../repositories/example.repository';
import { EntityClass } from '../entities/entity.class';
//Test unitarios para el service de la entidad

const testEntity: EntityClass = new EntityClass(1, 'Test', 'Russian Blue');

describe('AppController', () => {
  let service: ExampleService;
  let model: typeof Entity;
  let exampleController: ExampleController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        ExampleRepository,
        {
          provide: getModelToken(Entity),
          useValue: {
            findAll: jest.fn(() => [testEntity]),
            findOne: jest.fn(() => testEntity),
            create: jest.fn(() => testEntity),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    exampleController = moduleRef.get<ExampleController>(ExampleController);
    service = moduleRef.get(ExampleService);
    model = moduleRef.get<typeof Entity>(getModelToken(Entity));
  });

  describe('Get entity example', () => {
    it('should return Entity object', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.getEntity(1));
      expect(findSpy).toBeCalledWith({ where: { id: 1 } });
    });
  });
  describe('Get list of entities', () => {
    it('should return Entity object', async () => {
      expect(await service.getEntitiesList()).toEqual([testEntity]);
    });
  });
  describe('Create new entity record', () => {
    it('should add new Entity', async () => {
      expect(await service.createEntity({ firstField: 'Test', secondField: 'Russian Blue' }),).toEqual(testEntity);
    });
  });
  describe('Delete entity', () => {
    it('should remove Entity record', async () => {
      const destroyStub = jest.fn();
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: destroyStub,
      } as any);
      const retVal = await service.deleteEntity(1);
      expect(findSpy).toBeCalledWith({ where: { id: 1 } });
      expect(destroyStub).toBeCalledTimes(1);
      expect(retVal).toBeUndefined();
    });
  });
});
