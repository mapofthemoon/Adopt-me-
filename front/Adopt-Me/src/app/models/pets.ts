import {Type_of_animal} from './Type_of_animal'

export interface Shelter {
    id : number;
    name :string;
    type_of_animal_id: Type_of_animal;
    age: number;
    shelter: Shelter;
}
