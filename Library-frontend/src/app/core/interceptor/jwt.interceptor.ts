import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  jwtToken: string;
  constructor(private authService: AuthService) {
    this.jwtToken = JSON.parse(localStorage.getItem('authenticationToken'));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authService.currentUserValue;
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
