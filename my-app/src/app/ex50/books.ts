import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  getAll() {
    return {
      subscribe: (callback: any) => {
        callback.next([]);
      },
    };
  }
  getCoverUrl(filename: string): string {
    return `/api/covers/${filename}`;
  }
  delete(id: number) {
    return {
      subscribe: (callback: any) => {
        callback.next(null);
      },
    };
  }
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './books.html',
  styles: [`
    @import './books.css';
  `],
})
export class BooksComponent {
  books: Book[] = [];
  errMessage = '';

  constructor(private api: BookAPIService) {
    this.loadBooks();
  }

  loadBooks(): void {
    this.api.getAll().subscribe({
      next: (data: Book[]) => (this.books = data),
      error: (err: any) => (this.errMessage = err?.message || 'Lỗi tải danh sách'),
    });
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

  confirmDelete(book: Book): void {
    if (!confirm(`Bạn có chắc muốn xóa sách "${book.Tensach}"?`)) return;
    this.api.delete(book.MaSach).subscribe({
      next: () => this.loadBooks(),
      error: (err: any) => (this.errMessage = err?.message || 'Lỗi xóa'),
    });
  }
}
