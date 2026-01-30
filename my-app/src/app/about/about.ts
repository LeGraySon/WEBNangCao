import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html'
})
export class About {
  student_id: string = "SV123456";
  student_name: string = "Nguyen Van A";
  student_email: string = "LK@gmail.com";
  my_avtar: string = "prettiboiz.png";
}
