import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html'
})
export class Login implements OnInit {
  username = 'tranduythanh';
  password = '12345678';

  errorMsg = '';
  successMsg = '';
  cookieUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCookieUser();
  }

  onLogin(event: Event): void {
    event.preventDefault();

    this.errorMsg = '';
    this.successMsg = '';

    const user = this.username.trim();
    const pass = this.password.trim();

    if (!user || !pass) {
      this.errorMsg = 'Vui long nhap day du ten dang nhap va mat khau.';
      return;
    }

    this.http
      .post<any>(
        'http://localhost:3002/api/auth/login',
        {
          username: user,
          password: pass,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          if (res?.success) {
            this.successMsg = 'Dang nhap thanh cong. Dang chuyen trang...';
            setTimeout(() => {
              window.location.href = 'http://localhost:3002/login';
            }, 500);
            return;
          }

          this.errorMsg = 'Dang nhap that bai.';
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Khong the ket noi API login.';
        },
      });
  }

  loadCookieUser(): void {
    this.http
      .get<any>('http://localhost:3002/api/auth/me', { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.cookieUser = res?.loggedIn ? res.user : null;
        },
        error: () => {
          this.cookieUser = null;
        },
      });
  }
}
