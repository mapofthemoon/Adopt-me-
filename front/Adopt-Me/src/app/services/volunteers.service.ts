import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COMMON_BASE_URL} from "./source";
import { Observable} from "rxjs";
import {volunteer} from "../models/volunteer";

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  private BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'volunteers/';
  }

  public getAllVolunteers(): Observable<volunteer[]> {
    return this.http.get<volunteer[]>(this.BASE_URL);
  }

  public getVolunteerById(id: number): Observable<volunteer>{
    return this.http.get<volunteer>(`${this.BASE_URL}${id}`);
  }

  public addVolunteer(volunteer: volunteer): Observable<volunteer>{
    return this.http.post<volunteer>(`${this.BASE_URL}`, volunteer);
  }

  public updateVolunteer(id: number, volunteer: volunteer): Observable<volunteer>{
    return this.http.put<volunteer>(`${this.BASE_URL}${id}`, volunteer);
  }

  public deleteVolunteer(id: number): Observable<any>{
    return this.http.delete<volunteer>(`${this.BASE_URL}${id}`);
  }
}
