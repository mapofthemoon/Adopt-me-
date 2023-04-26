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

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'shelters/';
  }

  public getAllShelters(): Observable<Shelter[]>{
    // return this.http.get<Shelter[]>(this.BASE_URL);
    const shelters = [
      {id: 1, name: 'X', city: 'Almaty', country: 'Kazakhstan'},
      {id: 2, name: 'Y', city: 'Astana', country: 'Kazakhstan'},
      {id: 3, name: 'Z', city: 'Shymkent', country: 'Kazakhstan'},
    ];

    return new Observable<Shelter[]>(observer => {
      setTimeout(() => {
        observer.next(shelters);
      }, 1000);
    });
  }

  public getShelterById(id: number): Observable<Shelter> {
    return this.http.get<Shelter>(`${this.BASE_URL}${id}`);
  }

  public addShelter(shelter: Shelter): Observable<Shelter> {
    return this.http.post<Shelter>(`${this.BASE_URL}`, shelter);
  }

  public updateShelter(id: number, shelter: Shelter): Observable<Shelter> {
    return this.http.put<Shelter>(`${this.BASE_URL}${id}`, shelter);
  }

  public deleteShelter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}${id}`);
  }
}
