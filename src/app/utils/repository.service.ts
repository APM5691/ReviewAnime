import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Repository<T = any> {
  public route: string = 'http://localhost:3000/';
  protected path: string = '';
  constructor(public http: HttpClient) {
    this.route = isDevMode()
      ? 'http://localhost:3000/'
      : 'http://52.91.50.132/';
  }

  public fullRoute() {
    return `${this.route}${this.path}`;
  }

  public get(params?: HttpParams) {
    return this.http.get<T>(this.fullRoute(), { params });
  }

  public getById(id: number) {
    return this.http.get<T>(`${this.fullRoute()}/${id}`);
  }

  public post(formData: Object) {
    return this.http.post<T>(this.fullRoute(), formData);
  }

  public update(id: number, formData: Object) {
    return this.http.patch<T>(`${this.fullRoute()}/${id}`, formData);
  }

  public remove(id: number) {
    return this.http.delete<T>(`${this.fullRoute()}/${id}`);
  }
}
