import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FashionAPIService {
  private apiUrl = 'http://localhost:3002/fashions';

  constructor(private http: HttpClient) { }

  getFashions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getFashionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createFashion(fashion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fashion);
  }

  updateFashion(id: string, fashion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, fashion);
  }

  deleteFashion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
