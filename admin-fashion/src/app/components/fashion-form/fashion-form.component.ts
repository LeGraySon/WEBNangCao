import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion';

@Component({
  selector: 'app-fashion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, QuillModule],
  templateUrl: './fashion-form.component.html',
  styleUrl: './fashion-form.component.scss'
})
export class FashionFormComponent implements OnInit {
  styles = ['Street Style', 'Trends', 'Minimal'];
  isEdit = false;
  fashionId: string | null = null;
  loading = false;

  form = this.fb.group({
    title: ['', Validators.required],
    thumbnail: ['', Validators.required],
    style: ['Street Style', Validators.required],
    creationDate: ['', Validators.required],
    details: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fashionId = this.route.snapshot.paramMap.get('id');
    if (this.fashionId) {
      this.isEdit = true;
      this.loadFashion(this.fashionId);
    }
  }

  private toDateInput(value: string | Date): string {
    const d = new Date(value);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  loadFashion(id: string): void {
    this.loading = true;
    this.fashionService.getById(id).subscribe({
      next: (fashion) => {
        this.form.patchValue({
          title: fashion.title,
          thumbnail: fashion.thumbnail,
          style: fashion.style,
          creationDate: this.toDateInput(fashion.creationDate),
          details: fashion.details
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Fashion = {
      title: raw.title!,
      thumbnail: raw.thumbnail!,
      style: raw.style!,
      creationDate: new Date(raw.creationDate!).toISOString(),
      details: raw.details!
    };

    const request$ = this.isEdit && this.fashionId
      ? this.fashionService.update(this.fashionId, payload)
      : this.fashionService.create(payload);

    request$.subscribe(() => {
      this.router.navigate(['/fashions']);
    });
  }
}
