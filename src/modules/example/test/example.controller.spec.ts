import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { ExampleController } from '../controller/example.controller';
import { EntityClass } from '../entities/entity.class';
import { IEntity } from '../interfaces/entity.interface';
import { Entity } from '../model/entity.model';
import { ExampleRepository } from '../repositories/example.repository';
import { ExampleService } from '../service/example.service';

const testEntity: EntityClass = new EntityClass(1, 'Test', 'Russian Blue');

describe('ExampleController', () => {
    let exampleController: ExampleController;
    let exampleService: ExampleService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
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

        exampleService = moduleRef.get<ExampleService>(ExampleService);
        exampleController = moduleRef.get<ExampleController>(ExampleController);
    });

    describe('Get one entity by id', () => {
        it('should return an entity register', async () => {
            jest.spyOn(exampleService, 'getEntity').mockImplementation(async () => testEntity);// Hace un mock del metodo del service que se va a llamar
            expect(await exampleController.getEntityById(1)).toBe(testEntity);
        });
    });
});