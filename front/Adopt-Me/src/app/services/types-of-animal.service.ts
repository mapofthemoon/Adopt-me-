import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";
import {Type_of_animal} from "../models/Type_of_animal";

@Injectable({
  providedIn: 'root'
})
export class TypesOfAnimalService {
  get types_of_animals(): Type_of_animal[] {
    return this._types_of_animals;
  }
  private BASE_URL: string;


  //temp
  private _types_of_animals: Type_of_animal[];

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'types_of_animals/';
    this._types_of_animals = [
      {id: 1, type: 'Cat'},
      {id: 2, type: 'Dog'}
    ];
  }

  public getAllTypesOfAnimals(): Observable<Type_of_animal[]> {
    // return this.http.get<Type_of_animal[]>(this.BASE_URL);

    return new Observable<Type_of_animal[]>(observer => {
      setTimeout(() => {
        observer.next(this._types_of_animals);
      }, 0);
    });
  }

  public getTypeOfAnimalById(id: number): Observable<Type_of_animal>{
    return this.http.get<Type_of_animal>(`${this.BASE_URL}${id}`);
  }

  public addTypeOfAnimal(type: Type_of_animal): Observable<Type_of_animal>{
    return this.http.post<Type_of_animal>(this.BASE_URL, type);
  }

  public updateTypeOfAnimal(id: number, type: Type_of_animal): Observable<Type_of_animal>{
    return this.http.put<Type_of_animal>(`${this.BASE_URL}${id}`, type);
  }

  public deleteTypeOfAnimal(id: number): Observable<any>{
    return this.http.delete<any>(`${this.BASE_URL}${id}`);
  }
}
