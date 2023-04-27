import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";
import {Pet} from "../models/pets";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private BASE_URL: string;

  //temp
  private pets: Pet[];

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'pets/';

    //temp
    this.pets = [
      // {id: 1, }
    ];
  }

  public getAllPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(this.BASE_URL);
  }

  public getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.BASE_URL}${id}`);
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.BASE_URL}`, pet);
  }

  public updatePet(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.BASE_URL}${id}`, pet);
  }

  public deletePet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}${id}`);
  }
}
