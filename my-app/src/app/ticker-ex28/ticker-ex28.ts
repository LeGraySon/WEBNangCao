import { Component, OnInit } from '@angular/core';
import { TickerEx28Service } from '../myservices/ticker-ex28.service';
import { ITicker } from '../myclasses/iTicker';

@Component({
  selector: 'app-ticker-ex28',
  standalone: false,
  templateUrl: './ticker-ex28.html',
  styleUrl: './ticker-ex28.css',
})
export class TickerEx28 implements OnInit {
  tickers: ITicker[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private tickerService: TickerEx28Service) {}

  ngOnInit(): void {
    this.loadTickers();
  }

  loadTickers(): void {
    this.loading = true;
    this.error = '';
    this.tickerService.getTickerData().subscribe({
      next: (data) => {
        this.tickers = data;
        this.loading = false;
        console.log('Tickers loaded:', data);
      },
      error: (err) => {
        this.error = 'Failed to load cryptocurrency data: ' + err.message;
        this.loading = false;
        console.error('Error loading tickers:', err);
      }
    });
  }

  isPositive(value: string): boolean {
    return parseFloat(value) > 0;
  }

  isNegative(value: string): boolean {
    return parseFloat(value) < 0;
  }
}
