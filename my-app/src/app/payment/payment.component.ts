import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './payment.component.html',
})
export class PaymentComponent {
    amount: number = 50000;
    fullName: string = '';
    email: string = '';
    phone: string = '';
    loading: boolean = false;
    errorMsg: string = '';
    successMsg: string = '';

    constructor(private http: HttpClient) { }

    payWithMoMo() {
        // Validate inputs
        if (!this.fullName || !this.email || !this.phone || !this.amount) {
            this.errorMsg = 'Vui lòng điền đầy đủ thông tin thanh toán.';
            return;
        }

        this.loading = true;
        this.errorMsg = '';
        this.successMsg = '';

        const paymentData = {
            amount: this.amount,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            orderId: `ORDER_${Date.now()}`,
            orderInfo: `Thanh toán đơn hàng`,
            returnUrl: `${window.location.origin}/payment-result`
        };

        this.http.post<any>('http://localhost:3000/payment/momo', paymentData).subscribe({
            next: (response) => {
                this.loading = false;
                if (response && response.payUrl) {
                    this.successMsg = 'Đang chuyển hướng đến cổng thanh toán MoMo...';
                    setTimeout(() => {
                        window.location.href = response.payUrl;
                    }, 1000);
                } else {
                    this.errorMsg = 'Lỗi: Không thể lấy URL thanh toán từ máy chủ.';
                    console.error('Invalid response from server:', response);
                }
            },
            error: (err) => {
                this.loading = false;
                this.errorMsg = 'Lỗi kết nối đến máy chủ thanh toán. Vui lòng thử lại.';
                console.error('Payment error:', err);
            }
        });
    }

    resetForm() {
        this.fullName = '';
        this.email = '';
        this.phone = '';
        this.amount = 50000;
        this.errorMsg = '';
        this.successMsg = '';
    }
}
