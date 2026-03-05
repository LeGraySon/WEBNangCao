import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionAPIService } from '../fashion-apiservice/fashion-apiservice';

// Model class
export class Fashion {
  constructor(
    public _id: any = null,
    public style: string = "",
    public fashion_subject: string = "",
    public fashion_detail: string = "",
    public fashion_image: string = ""
  ) {}
}

// Component class
@Component({
  selector: 'app-fashion',
  imports: [CommonModule],
  templateUrl: './fashion.html',
})
export class FashionComponent implements OnInit {
  fashions: any[] = [];
  errMessage: string = '';

  constructor(private fashionService: FashionAPIService) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data.data || [];
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Error loading fashions: ' + err.message;
        console.error(err);
      }
    });
  }
}
