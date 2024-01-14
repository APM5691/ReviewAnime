import { Injectable } from '@angular/core';
import { Repository } from '../repository.service';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends Repository<Login> {
  isLogged: boolean = false;
  constructor(http: HttpClient) {
    super(http);
    this.path = 'auth/login';
  }

  login(body: Object) {
    return this.http.post(this.fullRoute(), body).pipe(
      tap((response: any) => {
        const token = response['token'];
        this.setToken(token);
      })
    );
  }

  getUser() {
    const token = localStorage.getItem('token');
    const payload = token?.split('.')[1];
    const payloadDecoded = atob(payload ?? 'Error');
    const user = JSON.parse(payloadDecoded);
    return user;
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? 'Error';
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  public isLogin() {
    const token = this.getToken();

    if (token === 'Error') {
      return false;
    }

    return true;
  }
}
