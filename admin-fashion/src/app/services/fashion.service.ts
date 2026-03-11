import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from '../models/fashion';

@Injectable({ providedIn: 'root' })
export class FashionService {
  private baseUrl = 'http://localhost:4200/api/fashions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.baseUrl);
  }

  getByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.baseUrl}/style/${encodeURIComponent(style)}`);
  }

  getById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.baseUrl}/${id}`);
  }

  create(fashion: Fashion): Observable<Fashion> {
    return this.http.post<Fashion>(this.baseUrl, fashion);
  }

  update(id: string, fashion: Fashion): Observable<Fashion> {
    return this.http.put<Fashion>(`${this.baseUrl}/${id}`, fashion);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
