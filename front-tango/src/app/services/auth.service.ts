import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserLogin } from '../models/userlogin';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);

  private _userName = new BehaviorSubject<string>(undefined);
  public usrName = this._userName.asObservable();

  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: User): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(`${this.URL}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(
              res.dataUser.accessToken, 
              res.dataUser.expiresIn, 
              res.dataUser.id,
              res.dataUser.firstName
            );
          }
        })
      );
  }

  login(user: UserLogin): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(`${this.URL}/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(
              res.dataUser.accessToken, 
              res.dataUser.expiresIn, 
              res.dataUser.id,
              res.dataUser.firstName
            );
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("EXPIRES_IN");
    sessionStorage.removeItem("USER_ID");
    sessionStorage.removeItem("USER_NAME");
    this._userName.next('');
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return !!sessionStorage.getItem('ACCESS_TOKEN');
  }

  private saveToken(token: string, expiresIn: string, userId: string, firstName: string): void {
    sessionStorage.setItem("ACCESS_TOKEN", token);
    sessionStorage.setItem("EXPIRES_IN", expiresIn);
    sessionStorage.setItem("USER_ID", userId);
    sessionStorage.setItem("USER_NAME", firstName);
    this._userName.next(firstName);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = sessionStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}