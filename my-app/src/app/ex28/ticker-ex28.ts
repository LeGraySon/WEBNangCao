import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ITicker {
  name?: string;
  symbol?: string;
  rank?: string;
  price_usd?: string;
  market_cap_usd?: string;
  '24h_volume_usd'?: string;
  percent_change_1h?: string;
  percent_change_24h?: string;
  percent_change_7d?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-ticker-ex28',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker-ex28.html',
})
export class TickerEx28 implements OnInit {
  tickers: ITicker[] = [];
  loading: boolean = false;
  error: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadTickers();
  }

  loadTickers(): void {
    this.loading = false;
  }

  isPositive(value: string | undefined): boolean {
    return value ? parseFloat(value) > 0 : false;
  }

  isNegative(value: string | undefined): boolean {
    return value ? parseFloat(value) < 0 : false;
  }

  safeValue(value: string | undefined): string {
    return value || '0';
  }
}
