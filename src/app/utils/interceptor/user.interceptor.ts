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

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let interceptRequest = request;

    const token = this.loginService.getToken();

    if (token !== 'Error') {
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
