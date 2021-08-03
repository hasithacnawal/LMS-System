import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from '../../authentication/register-payload';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';

import { JwtAuthResponse } from 'src/app/authentication/jwt-auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser: Observable<User>;

  private url = 'http://localhost:8888/api/auth/';

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('authUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(registerPayload: RegisterPayload) {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<any>(this.url + 'login', { email, password })
      .pipe(
        map((data) => {
          localStorage.setItem(
            'authenticationToken',
            JSON.stringify(data.authenticationToken)
          );

          localStorage.setItem('authUser', JSON.stringify(data.value));
          this.currentUserSubject.next(data.value);

          return data;
        })
      );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('authUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }

  isAuthenticated(): Boolean {
    return localStorage.getItem('authUser') != null;
  }
}
