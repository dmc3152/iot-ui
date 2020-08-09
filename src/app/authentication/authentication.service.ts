import { Injectable } from '@angular/core';
import { shareReplay, tap, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/auth/`;
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const payload = { email, password };
    return this.http.post<User>(this.baseUrl + 'login', payload)
      .pipe(
        tap(res => {
          this.setSession(res);
        }),
        shareReplay()
      );
  }

  register(user: User) {
    return this.http.post<User>(this.baseUrl + 'register', user)
      .pipe(
        flatMap((registeredUser: User) => {
          return this.login(user.email, user.password);
       })
      );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    sessionStorage.setItem('id_token', authResult.authToken);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.isTokenExpired();
  }

  logout() {
    sessionStorage.clear();
    this.isTokenExpired();
  }

  isLoggedIn(): Observable<boolean> {
    this.isTokenExpired();
    return this._isLoggedIn;
  }

  isTokenExpired(): boolean {
    const expiration = this.getExpiration();
    const isExpired = expiration ? moment().isAfter(expiration) : true;
    this._isLoggedIn.next(!isExpired);
    return isExpired;
  }

  getExpiration() {
    const expiration = sessionStorage.getItem('expires_at');

    if (!expiration) return null;

    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
