import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fashion58Service, Fashion58 } from './ex58.service';

type FashionGroup = { style: string; items: Fashion58[] };

@Component({
  selector: 'app-ex58',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ex58.html',
  // Workaround: @angular/core 21.0.6 typings incorrectly type styleUrls.
  styleUrls: ['./ex58.css'] as any,
})
export class Ex58 implements OnInit {
  allFashions: Fashion58[] = [];
  groupedFashions: FashionGroup[] = [];
  loading = false;
  error = '';
  keyword = '';
  selected: Fashion58 | null = null;

  private styleOrder = ['Street Style', 'Trends', 'Minimal'];

  constructor(private fashionService: Fashion58Service) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.loading = true;
    this.error = '';
    this.fashionService.getAll().subscribe({
      next: (data) => {
        this.allFashions = Array.isArray(data) ? data : [];
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load fashions.';
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    const term = this.keyword.trim().toLowerCase();
    const filtered = term
      ? this.allFashions.filter((item) => this.matches(item, term))
      : this.allFashions;
    this.groupedFashions = this.groupByStyle(filtered);
    if (this.selected && !filtered.includes(this.selected)) {
      this.selected = null;
    }
  }

  private matches(item: Fashion58, term: string): boolean {
    const haystack = `${item.title || ''} ${item.details || ''} ${item.style || ''}`.toLowerCase();
    return haystack.includes(term);
  }

  private groupByStyle(items: Fashion58[]): FashionGroup[] {
    const map = new Map<string, Fashion58[]>();
    items.forEach((item) => {
      const style = (item.style || 'Other').trim() || 'Other';
      if (!map.has(style)) map.set(style, []);
      map.get(style)!.push(item);
    });

    const groups: FashionGroup[] = [];
    this.styleOrder.forEach((style) => {
      if (map.has(style)) {
        groups.push({ style, items: map.get(style)! });
        map.delete(style);
      }
    });

    const remaining = Array.from(map.keys()).sort();
    remaining.forEach((style) => {
      groups.push({ style, items: map.get(style)! });
    });

    return groups;
  }

  openDetail(item: Fashion58): void {
    this.selected = item;
  }

  closeDetail(): void {
    this.selected = null;
  }

}
