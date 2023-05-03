import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {COMMON_BASE_URL} from "./source";
import {map, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string;
  private _authenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.BASE_URL = `${COMMON_BASE_URL}` ;
    this._authenticated = false;
  }

  public login(user: User):Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}login`, user).pipe(map(array => {
            localStorage.setItem('token', array.jwt);
            this._authenticated = true;
        }));
  }

  public logout() {
      return this.http.post<any>(`${this.BASE_URL}logout`, {}).pipe(map(_ => {
          localStorage.removeItem('token');
          this._authenticated = false;
          this.router.navigate(['login']);
      }));
  }

  public user(): Observable<User> {
      return this.http.get<User>(`${this.BASE_URL}user`);
  }

  public signUp(user: User): Observable<User> {
      return this.http.post<User>(`${this.BASE_URL}register`, user);
  }
}
