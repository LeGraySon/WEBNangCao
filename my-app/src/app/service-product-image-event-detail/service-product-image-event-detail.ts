import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './service-product-image-event-detail.html',
  styleUrls: ['./service-product-image-event-detail.css'],
})
export class ServiceProductImageEventDetail {
  selectedProduct: any
  constructor(private router: Router, private activeRoute: ActivatedRoute, private pservice: ProductService) {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get("id")
      if (id != null) {
        this.selectedProduct = this.pservice.getProductDetail(id)
      }
    })
  }
  goBack() {
    this.router.navigate(['service-product-image-event'])
  }
}
