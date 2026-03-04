import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment-result',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './payment-result.component.html',
})
export class PaymentResultComponent implements OnInit {
    resultCode: string | null = null;
    message: string | null = null;
    orderId: string | null = null;
    amount: string | null = null;
    isSuccess: boolean = false;
    transId: string | null = null;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        // MoMo redirects back with query parameters
        this.route.queryParams.subscribe(params => {
            this.resultCode = params['resultCode'] || params['code'] || null;
            this.message = params['message'] || 'Không xác định lỗi';
            this.orderId = params['orderId'];
            this.amount = params['amount'];
            this.transId = params['transId'];

            // resultCode '0' means success in MoMo API
            this.isSuccess = String(this.resultCode) === '0';

            // Log chi tiết cho debugging
            console.log('Payment Result:', {
                resultCode: this.resultCode,
                message: this.message,
                orderId: this.orderId,
                amount: this.amount,
                transId: this.transId,
                isSuccess: this.isSuccess
            });
        });
    }

    goBackToHome(): void {
        this.router.navigate(['/']);
    }

    retryPayment(): void {
        this.router.navigate(['/payment']);
    }
}
