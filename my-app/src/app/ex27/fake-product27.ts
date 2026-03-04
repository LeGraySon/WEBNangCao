import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fake-product27',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fake-product27.html',
})
export class FakeProduct27 {
  data:any
    errMessage:string=''
    loading:boolean=true
    
    constructor(){
      this.loading = false;
    }
}
