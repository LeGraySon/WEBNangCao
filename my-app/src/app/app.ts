import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb } from './ptb/ptb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Learnbinding,
    Ptb
  ],
  templateUrl: './app.html',
  styles: [`
    @import './app.css';
  `]
})
export class App {
  protected readonly title = signal('my-app');
}
