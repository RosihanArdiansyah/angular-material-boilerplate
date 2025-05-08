// crud.service.ts
import { Inject, Injectable, InjectionToken } from '@angular/core';
export const CRUD_ENDPOINT = new InjectionToken<string>('CRUD_ENDPOINT');
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(CRUD_ENDPOINT) private endpoint: string  // Use InjectionToken
  ) {
    this.apiUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: string | number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Custom query methods
  query(params: any): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { params });
  }
}
