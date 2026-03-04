import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fake-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fake-product.html',
})
export class FakeProduct {
  data:any
  errMessage:string=''
  loading:boolean=true
  
  constructor(){
    this.loading = false;
  }
}
