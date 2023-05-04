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

  //temp
  private volunteers: volunteer[];

  constructor(private http: HttpClient) {
    this.BASE_URL = COMMON_BASE_URL + 'volonturees/';
    this.volunteers = [
      {id: 1, name: 'Ali', surname: 'Imangaliyev', age: 20, working_shelter: {id: 1, name: 'X', address: 'Almaty', phone: 'Kazakhstan'}},
      {id: 2, name: 'Zhonniks', surname: 'Umarova', age: 20, working_shelter: {id: 2, name: 'Y', address: 'Astana', phone: 'Kazakhstan'}},
      {id: 3, name: 'Aisha', surname: 'Aspanova', age: 20, working_shelter:  {id: 3, name: 'Z', address: 'Shymkent', phone: 'Kazakhstan'}},
    ];
  }

  public getAllVolunteers(): Observable<volunteer[]> {
    return this.http.get<volunteer[]>(this.BASE_URL);

    // return new Observable<volunteer[]>(observer => {
    //   setTimeout(() => {
    //     observer.next(this.volunteers);
    //   }, 1000);
    // });
  }

  public getVolunteerById(id: number): Observable<volunteer>{
    return this.http.get<volunteer>(`${this.BASE_URL}${id}/`);
  }

  public addVolunteer(volunteer: volunteer): Observable<volunteer>{
    return this.http.post<volunteer>(`${COMMON_BASE_URL}add_volonturees/`, volunteer);

    // this.volunteers.push(volunteer);
    //
    // return new Observable<volunteer>(observer => {
    //   setTimeout(() => {
    //     observer.next(volunteer);
    //   }, 1000);
    // });
  }

  public updateVolunteer(id: number, volunteer: volunteer): Observable<volunteer>{
    return this.http.put<volunteer>(`${this.BASE_URL}${id}/edit/`, volunteer);

    // for(let i = 0; i < this.volunteers.length; i++){
    //   if(this.volunteers[i].id == id){
    //     this.volunteers[i] = volunteer;
    //     break;
    //   }
    // }

    // return new Observable<volunteer>(observer => {
    //   setTimeout(() => {
    //     observer.next(volunteer);
    //   }, 1000);
    // });
  }

  public deleteVolunteer(id: number): Observable<any>{
    return this.http.delete<volunteer>(`${this.BASE_URL}${id}/delete/`);

    // for(let i = 0; i < this.volunteers.length; i++){
    //   if(this.volunteers[i].id == id){
    //     this.volunteers.splice(i, 1);
    //     break;
    //   }
    // }

    // return new Observable(observer => {
    //   setTimeout(() => {
    //     observer.next(1);
    //   }, 1000);
    // });
  }
}
