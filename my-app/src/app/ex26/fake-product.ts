import { Component } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-fake-product',
  standalone: false,
  templateUrl: './fake-product.html',
  styleUrl: './fake-product.css',
})
export class FakeProduct {
  data:any
  errMessage:string=''
  loading:boolean=true
  
  constructor(_service:FakeProductService){
    console.log('FakeProduct component initialized');
    console.log('Calling API...');
    
    _service.getFakeProductData().subscribe({
      next:(data)=>{ 
        console.log('API Success! Data received:', data);
        this.data=data;
        this.loading=false;
      },
      error:(err)=>{
        console.error('API Error:', err);
        this.errMessage=err.message || 'Failed to load data';
        this.loading=false;
      }
    })
  }
}
