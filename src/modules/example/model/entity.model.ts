import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'entity',
    timestamps: true,
})
export class Entity extends Model {
    // id es heredado de Model
    @Column
    firstField: string;

    @Column
    secondField: string;

    //Para definir relaciones revisar doc: https://docs.nestjs.com/techniques/database#relations-1
}