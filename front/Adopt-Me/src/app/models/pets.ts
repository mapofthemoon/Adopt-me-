import {Type_of_animal} from './Type_of_animal'
import {Shelter} from "./shelters";

export interface Pet {
    id : number;
    name: string;
    // type_of_animal_id: Type_of_animal;
    breed: string;
    age: number;
    gender: string;
    description: string;
    shelter: Shelter;
}
