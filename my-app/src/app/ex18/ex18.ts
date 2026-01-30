import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ex18',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './ex18.html',
  styleUrls: ['./ex18.css'],
})
export class Ex18 {
  customerGroups$: Observable<any>;
  constructor(private http: HttpClient) {
    this.customerGroups$ = this.http.get('/assets/data/customers.json');
  }
}
