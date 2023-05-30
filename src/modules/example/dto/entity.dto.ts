import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEntityDto {
    @IsNotEmpty() //Valida que los campos no estén vacíos
    @IsString()// Valida que los campos sean de tipo string
    firstField: string;

    @IsNotEmpty()
    @IsString()
    secondField: string;
}