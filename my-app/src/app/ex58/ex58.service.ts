import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion58 {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  fashion_image?: string;
  style: string;
  creationDate?: string;
}

@Injectable({ providedIn: 'root' })
export class Fashion58Service {
  private baseUrl = 'http://localhost:3002/api/fashions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fashion58[]> {
    return this.http.get<Fashion58[]>(this.baseUrl);
  }

  getByStyle(style: string): Observable<Fashion58[]> {
    return this.http.get<Fashion58[]>(`${this.baseUrl}/style/${encodeURIComponent(style)}`);
  }

  getById(id: string): Observable<Fashion58> {
    return this.http.get<Fashion58>(`${this.baseUrl}/${id}`);
  }

  create(fashion: Fashion58): Observable<Fashion58> {
    return this.http.post<Fashion58>(this.baseUrl, fashion);
  }

  update(id: string, fashion: Fashion58): Observable<Fashion58> {
    return this.http.put<Fashion58>(`${this.baseUrl}/${id}`, fashion);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
