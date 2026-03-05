import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styles: [`
    @import './app.css';
  `]
})
export class App {
  protected readonly title = signal('my-app');
}
