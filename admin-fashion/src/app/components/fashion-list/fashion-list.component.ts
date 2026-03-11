import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.scss'
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  loading = false;
  error = '';

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.loading = true;
    this.fashionService.getAll().subscribe({
      next: (data) => {
        this.fashions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load fashions.';
        this.loading = false;
      }
    });
  }

  deleteFashion(item: Fashion): void {
    if (!item._id) return;
    const ok = window.confirm('Delete this fashion item?');
    if (!ok) return;

    this.fashionService.delete(item._id).subscribe(() => {
      this.loadFashions();
    });
  }
}
