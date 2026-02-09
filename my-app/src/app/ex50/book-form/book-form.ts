import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

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
  uploadCover(file: File) {
    return {
      subscribe: (callback: any) => {
        callback.next({ filename: 'uploaded.jpg' });
      },
    };
  }
  update(id: number, payload: any) {
    return {
      subscribe: (callback: any) => {
        callback.next(null);
      },
    };
  }
  create(payload: any) {
    return {
      subscribe: (callback: any) => {
        callback.next(null);
      },
    };
  }
}

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styles: [`
    @import './book-form.css';
  `],
})
export class BookFormComponent {
  book: Partial<Book> = {
    Tensach: '',
    Giaban: 0,
    Mota: '',
    Anhbia: '',
    Soluongton: 0,
    MaCD: 0,
    MaNXB: 0,
  };
  isEdit = false;
  id: number | null = null;
  errMessage = '';
  selectedFile: File | null = null;
  previewUrl = '';

  constructor(
    private api: BookAPIService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.api.getById(this.id).subscribe({
        next: (b: any) => {
          this.book = { ...b };
          if (b.Anhbia) this.previewUrl = this.api.getCoverUrl(b.Anhbia);
        },
        error: (err: any) => (this.errMessage = err?.message || 'Không tải được sách'),
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.book.Anhbia = '';
    this.previewUrl = '';
  }

  save(): void {
    this.errMessage = '';
    if (this.selectedFile) {
      this.api.uploadCover(this.selectedFile).subscribe({
        next: (res: any) => {
          this.book.Anhbia = res.filename;
          this.submit();
        },
        error: (err: any) => (this.errMessage = err?.message || 'Lỗi tải ảnh'),
      });
    } else {
      this.submit();
    }
  }

  private submit(): void {
    const payload = {
      Tensach: this.book.Tensach,
      Giaban: this.book.Giaban,
      Mota: this.book.Mota,
      Anhbia: this.book.Anhbia || '',
      Ngaycapnhat: this.book.Ngaycapnhat || new Date().toISOString().slice(0, 19).replace('T', ' '),
      Soluongton: this.book.Soluongton,
      MaCD: this.book.MaCD,
      MaNXB: this.book.MaNXB,
    };
    if (this.isEdit && this.id != null) {
      this.api.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err: any) => (this.errMessage = err?.message || 'Lỗi cập nhật'),
      });
    } else {
      this.api.create(payload).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err: any) => (this.errMessage = err?.message || 'Lỗi thêm sách'),
      });
    }
  }
}
