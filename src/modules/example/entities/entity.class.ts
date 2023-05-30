//Definimos una clase para cada entidad que maneja el modulo, con sus propios atributos, getters, setters y metodos adicionales que necesitemos

export class EntityClass {
    id: number;
    firstField: string;
    secondField: string;

    constructor(id: number, firstField: string, secondField: string) {
        this.id = id;
        this.firstField = firstField;
        this.secondField = secondField;
    }

    getId(): number {
        return this.id;
    }
    getFirstField(): string {
        return this.firstField;
    }
    getSecondField(): string {
        return this.secondField;
    }
    setId(id: number) { //Ojo: este metodo es a modo de ejemplo, el id no deberia ser modificado ya que corresponde al id de la DB
        this.id = id;
    }
    setFirstField(firstField: string) {
        this.firstField = firstField;
    }
    setSecondField(secondField: string) {
        this.secondField = secondField;
    }
}