import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {COMMON_BASE_URL} from "./source";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.BASE_URL = `${COMMON_BASE_URL}` ;
  }

  public login(email: string, password: string):Observable<any> {
    return this.http.post<any>(
        `${this.BASE_URL}login`,
        {
            'email': email,
            'password': password
        }
    ).pipe(map(array => {
            localStorage.setItem('token', array.jwt);
        }));
  }

  public logout() {
      return this.http.post<any>(`${this.BASE_URL}/logout`, {}).pipe(map(_ => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
      }));
  }


}
