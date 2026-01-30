import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ptb',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ptb.html',
  styles: [`
    @import './ptb.css';
  `]
})
export class Ptb {
  a: number = 0;
  b: number = 0;
  result: string = "";

  get_solution() {
    // Calculate solution for linear equation ax + b = 0
    if (this.a === 0 && this.b === 0) {
      this.result = "Phương trình vô số nghiệm";
    } else if (this.a === 0 && this.b !== 0) {
      this.result = "Phương trình vô nghiệm";
    } else {
      const x = -this.b / this.a;
      this.result = "Phương trình có nghiệm x = " + x.toFixed(2);
    }
  }

  clear() {
    this.a = 0;
    this.b = 0;
    this.result = "";
  }
}

