import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion';
import { StyleFilterComponent } from '../style-filter/style-filter.component';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, RouterLink, StyleFilterComponent],
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.scss'
})
export class FashionListComponent implements OnInit {
  styles = ['Street Style', 'Trends', 'Minimal'];
  selectedStyle = 'All';
  groupedFashions: Record<string, Fashion[]> = {};
  visibleStyles: string[] = [];
  loading = false;

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  onStyleChange(style: string): void {
    this.selectedStyle = style;
    if (style === 'All') {
      this.loadAll();
    } else {
      this.loadByStyle(style);
    }
  }

  private loadAll(): void {
    this.loading = true;
    this.fashionService.getAll().subscribe((data) => {
      this.applyGrouping(data);
      this.loading = false;
    });
  }

  private loadByStyle(style: string): void {
    this.loading = true;
    this.fashionService.getByStyle(style).subscribe((data) => {
      this.applyGrouping(data);
      this.loading = false;
    });
  }

  private applyGrouping(fashions: Fashion[]): void {
    this.groupedFashions = fashions.reduce((acc, item) => {
      if (!acc[item.style]) acc[item.style] = [];
      acc[item.style].push(item);
      return acc;
    }, {} as Record<string, Fashion[]>);

    this.visibleStyles = this.selectedStyle === 'All'
      ? Object.keys(this.groupedFashions)
      : [this.selectedStyle];
  }
}
