import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-service-product-image-event',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service-product-image-event.html',
  styleUrls: ['./service-product-image-event.css'],
})
export class ServiceProductImageEvent {
  products: any
  constructor(private pservice: ProductService, private router: Router) {
    this.products = this.pservice.getProductsWithImages()
  }
  viewDetail(p: any) {
    this.router.navigate(['service-product-image-event', p.ProductId])
  }
}
