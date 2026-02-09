import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Book {
  MaSach: number;
  Tensach: string;
  Giaban: number;
  Mota: string;
  Anhbia: string;
  Ngaycapnhat: string;
  Soluongton: number;
  MaCD: number;
  MaNXB: number;
}

class BookAPIService {
  getById(id: number) {
    return {
      subscribe: (callback: any) => {
        callback.next({});
      },
    };
  }
  getCoverUrl(filename: string): string {
    return `/api/covers/${filename}`;
  }
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styles: [`
    @import './book-detail.css';
  `],
})
export class BookDetailComponent {
  book: Book | null = null;
  errMessage = '';

  constructor(private api: BookAPIService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getById(+id).subscribe({
        next: (b: any) => (this.book = b),
        error: (err: any) => (this.errMessage = err?.message || 'Không tải được chi tiết'),
      });
    }
  }

  getCoverUrl(filename: string): string {
    return this.api.getCoverUrl(filename);
  }

  formatDate(val: string): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
