import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './auth/register-payload';
import { from, Observable } from 'rxjs';
import { LoginPayload } from './auth/login-payload';
import { JwtAuthResponse } from './auth/jwt-auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient) {}

  register(registerPayload: RegisterPayload) {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload) {
    return this.httpClient
      .post<JwtAuthResponse>(this.url + 'login', loginPayload)
      .pipe(
        map((data) => {
          localStorage.setItem(
            'authenticationToken',
            JSON.stringify(data.authenticationToken)
          );
          localStorage.setItem('userName', JSON.stringify(data.userName));

          return data;
        })
      );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('userName');
  }

  isAuthenticated(): Boolean {
    return localStorage.getItem('userName') != null;
  }
}
