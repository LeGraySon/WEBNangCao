import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: true,
  imports: [],
  templateUrl: './learnbinding.html',
  styles: [`
    @import './learnbinding.css';
  `]
})
export class Learnbinding {
  student_id:string="B20DCCN001";
  student_name:string="Nguyen Van A";
  student_address:string="Ha Noi";

}
