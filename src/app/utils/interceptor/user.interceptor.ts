import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private router: Router // Import Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let interceptRequest = request;

    const token = this.loginService.getToken();

    // Verificar si el token ha expirado
    const isTokenExpired = this.loginService.tokenIsExpired();

    if (isTokenExpired) {
      this.loginService.removeToken();
      this.router.navigate(['/login']);
      return next.handle(request);
    }

    if (token) {
      interceptRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`), // Set token
      });
    }
    return next.handle(interceptRequest);
  }
}

export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true,
  },
];
