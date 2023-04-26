import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";
import {Shelter} from "../models/shelters";

@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  private BASE_URL: string;
  //temp
  private shelters: Shelter[];

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'shelters/';
    this.shelters =  [
      {id: 1, name: 'X', city: 'Almaty', country: 'Kazakhstan'},
      {id: 2, name: 'Y', city: 'Astana', country: 'Kazakhstan'},
      {id: 3, name: 'Z', city: 'Shymkent', country: 'Kazakhstan'},
    ];
  }

  public getAllShelters(): Observable<Shelter[]>{
    // return this.http.get<Shelter[]>(this.BASE_URL);

    return new Observable<Shelter[]>(observer => {
      setTimeout(() => {
        observer.next(this.shelters);
      }, 1000);
    });
  }

  public getShelterById(id: number): Observable<Shelter> {
    return this.http.get<Shelter>(`${this.BASE_URL}${id}`);
  }

  public addShelter(shelter: Shelter): Observable<Shelter> {
    // return this.http.post<Shelter>(`${this.BASE_URL}`, shelter);
    this.shelters.push(shelter);

    return new Observable<Shelter>(observer => {
      setTimeout(() => {
        observer.next(shelter);
      }, 1000);
    });
  }

  public updateShelter(id: number, shelter: Shelter): Observable<Shelter> {
    // return this.http.put<Shelter>(`${this.BASE_URL}${id}`, shelter);

    for(let i = 0; i < this.shelters.length; i++){
      if(this.shelters[i].id === shelter.id){
        this.shelters[i] = shelter;
        break;
      }
    }

    return new Observable<Shelter>(observer => {
      setTimeout(() => {
        observer.next(shelter);
      }, 1000);
    });
  }

  public deleteShelter(id: number): Observable<any> {
    // return this.http.delete<any>(`${this.BASE_URL}${id}`);

    for(let i = 0; i < this.shelters.length; i++){
      if(this.shelters[i].id === id){
        this.shelters.splice(i, 1);
        break;
      }
    }

    return new Observable<number>(observer => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
    });
  }
}
