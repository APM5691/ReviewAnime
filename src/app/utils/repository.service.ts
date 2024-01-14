import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Repository<T = any> {
  public route: string = 'http://3.131.242.240/';
  protected path: string = '';
  constructor(public http: HttpClient) {}

  public fullRoute() {
    return `${this.route}${this.path}`;
  }

  public get(params?: HttpParams) {
    return this.http.get<T>(this.fullRoute(), { params });
  }

  public post(formData: Object) {
    return this.http.post<T>(this.fullRoute(), formData);
  }

  public update(id: number, formData: Object) {
    return this.http.put<T>(`${this.fullRoute()}/${id}`, formData);
  }

  public remove(id: number) {
    return this.http.delete<T>(`${this.fullRoute()}/${id}`);
  }
}
