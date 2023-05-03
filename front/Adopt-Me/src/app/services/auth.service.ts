import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {COMMON_BASE_URL} from "./source";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.BASE_URL = COMMON_BASE_URL;
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
        `${this.BASE_URL}`,
        {},
        {
          params: {
            ['email']: email,
            ['password']: password
          }
        }
        );
  }


}
