import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const API = 'http://localhost:3002';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-ex63',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ex63.html',
})
export class Ex63Component implements OnInit {
  products: Product[] = [];
  cart: CartItem[] = [];
  view = 'products';
  message = '';
  removeIds: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.http.get<Product[]>(`${API}/products`, { withCredentials: true }).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadCart(): void {
    this.http.get<CartItem[]>(`${API}/cart`, { withCredentials: true }).subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(productId: string): void {
    this.http
      .post<any>(`${API}/cart/add`, { productId, quantity: 1 }, { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.message = 'Added to cart!';
          this.cart = data.cart;
          setTimeout(() => {
            this.message = '';
          }, 1200);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  toggleRemove(productId: string, checked: boolean): void {
    if (checked) {
      this.removeIds.push(productId);
    } else {
      this.removeIds = this.removeIds.filter((id) => id !== productId);
    }
  }

  updateCart(): void {
    const updates = this.cart.map((item) => ({
      productId: item.productId,
      quantity: Number(item.quantity),
    }));

    this.http.post<any>(`${API}/cart/update`, { updates }, { withCredentials: true }).subscribe({
      next: (data) => {
        this.cart = data.cart;
        this.removeIds = [];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  removeSelected(): void {
    if (this.removeIds.length === 0) return;

    this.http
      .post<any>(`${API}/cart/remove`, { productIds: this.removeIds }, { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.cart = data.cart;
          this.removeIds = [];
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  showCart(): void {
    this.loadCart();
    this.view = 'cart';
  }

  showProducts(): void {
    this.view = 'products';
  }
}
