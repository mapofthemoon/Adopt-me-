import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";
import {Shelter} from "../models/pets";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'pets/';
  }

  public getAllPets(): Observable<Shelter[]>{
    return this.http.get<Shelter[]>(this.BASE_URL);
  }

  public getPetById(id: number): Observable<Shelter> {
    return this.http.get<Shelter>(`${this.BASE_URL}${id}`);
  }

  public addPet(pet: Shelter): Observable<Shelter> {
    return this.http.post<Shelter>(`${this.BASE_URL}`, pet);
  }

  public updatePet(id: number, pet: Shelter): Observable<Shelter> {
    return this.http.put<Shelter>(`${this.BASE_URL}${id}`, pet);
  }

  public deletePet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}${id}`);
  }
}
