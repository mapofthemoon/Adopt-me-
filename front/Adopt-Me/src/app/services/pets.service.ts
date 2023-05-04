import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";
import {Pet} from "../models/pets";
import {SheltersService} from "./shelters.service";
import {TypesOfAnimalService} from "./types-of-animal.service";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private BASE_URL: string;

  //temp
  private pets: Pet[];

  constructor(
    private http: HttpClient,
    private sheltersService: SheltersService,
    private typesOfAnimalsService: TypesOfAnimalService
  ) {
    this.BASE_URL = COMMON_BASE_URL + 'pets/';

    //temp
    this.pets = [
    //   {id: 1, name: 'Calico', type_of_animal_id: this.typesOfAnimalsService.types_of_animals[0], shelter: this.sheltersService.shelters[0], age: 2},
    //   {id: 2, name: 'Korgi', type_of_animal_id: this.typesOfAnimalsService.types_of_animals[1], shelter: this.sheltersService.shelters[1], age: 3}
    ];
  }

  public getAllPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(this.BASE_URL);

    // return new Observable<Pet[]>(observer => {
    //   setTimeout(() => {
    //     observer.next(this.pets);
    //   } ,0);
    // });
  }

  public getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.BASE_URL}${id}/`);
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${COMMON_BASE_URL}add_pet/`, pet);
    // this.pets.push(pet);
    //
    // return new Observable<Pet>(observer => {
    //   setTimeout(() => {
    //     observer.next(pet);
    //   } ,0);
    // });
  }

  public updatePet(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.BASE_URL}${id}/edit/`, pet);

    // for(let i = 0; this.pets.length; i++){
    //   if(this.pets[i].id == pet.id){
    //     this.pets[i] = pet;
    //     break;
    //   }
    // }

    // return new Observable<Pet>(observer => {
    //   setTimeout(() => {
    //     observer.next(pet);
    //   } ,0);
    // });

  }

  public deletePet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}${id}/delete/`)
    // for(let i = 0; this.pets.length; i++){
    //   if(this.pets[i].id == id){
    //     this.pets.splice(i, 1);
    //     break;
    //   }
    // }
    //
    // return new Observable<number>(observer => {
    //   setTimeout(() => {
    //     observer.next(1);
    //   }, 1000);
    // });
  }
}
