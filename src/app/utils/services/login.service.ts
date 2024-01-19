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

  getToken() {
    return localStorage.getItem('token') ?? false;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return token !== false && token !== null;
  }

  public isLogin() {
    const token = this.getToken();

    if (token === false) {
      return false;
    }

    return true;
  }
}
