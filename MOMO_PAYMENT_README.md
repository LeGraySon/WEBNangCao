# 💳 MoMo Payment Integration - README

## 📖 Mô Tả Dự Án

Hệ thống thanh toán trực tuyến tích hợp **MoMo** - ứng dụng ví điện tử phổ biến nhất ở Việt Nam.

### Tính Năng Chính
- ✅ Giao diện thanh toán đẹp mắt và thân thiện
- ✅ Xác thực HMAC SHA256 an toàn
- ✅ Webhook IPN (Instant Payment Notification)
- ✅ Xử lý lỗi chi tiết
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ CORS middleware
- ✅ Morgan logging

---

## 🏗️ Cấu Trúc Dự Án

```
project/
├── my-app/                          # Angular Frontend
│   ├── src/app/
│   │   ├── payment/                 # Trang thanh toán
│   │   │   ├── payment.component.ts
│   │   │   ├── payment.component.html
│   │   │   └── payment.component.css
│   │   ├── payment-result/          # Trang kết quả
│   │   │   ├── payment-result.component.ts
│   │   │   ├── payment-result.component.html
│   │   │   └── payment-result.component.css
│   │   ├── app.routes.ts            # Routes config
│   │   └── app.ts                   # Main component
│   └── ...
│
├── my-server/                       # Express Backend
│   ├── index.js                     # Server chính
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment config
│   └── public/
│
└── HUONG_DAN_MOMO_PAYMENT.md       # Hướng dẫn chi tiết
```

---

## 🔄 Quy Trình Thanh Toán

```
┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT FLOW                            │
└─────────────────────────────────────────────────────────────┘

1. User
   └─> Điền thông tin thanh toán trên Frontend
       └─> Họ, Email, SĐT, Số tiền

2. Frontend (Angular)
   └─> POST /api/payment/momo
       ├─> Gửi dữ liệu người dùng và số tiền
       └─> Backend xử lý

3. Backend (Node.js)
   └─> Tạo request MoMo
       ├─> Tính HMAC SHA256 signature
       ├─> POST https://test-payment.momo.vn/v2/gateway
       └─> Nhận payUrl từ MoMo

4. Frontend
   └─> Nhận payUrl
       └─> window.location.href = payUrl
           └─> Redirect đến MoMo Gateway

5. MoMo Gateway
   └─> User nhập thông tin ví MoMo
       ├─> Xác nhận thanh toán
       └─> Redirect về returnUrl + query params

6. Payment Result Page
   └─> Hiển thị kết quả thanh toán
       ├─> resultCode = 0 ✓ (Thành công)
       └─> resultCode ≠ 0 ✗ (Thất bại)

7. Backend (IPN Webhook)
   └─> MoMo gửi IPN notification
       ├─> POST /api/payment/momo/ipn
       ├─> Xác minh signature
       ├─> Cập nhật database
       └─> Gửi email xác nhận
```

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Angular | 17+ | Framework |
| TypeScript | 5.0+ | Language |
| RxJS | Latest | Async handling |
| CSS3 | Latest | Styling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 14+ | Runtime |
| Express | 5.0+ | Framework |
| Axios | 1.6.0 | HTTP Client |
| CORS | 2.8.5 | CORS middleware |
| Morgan | 1.10.0 | HTTP Logger |
| Crypto | Built-in | HMAC SHA256 |

### External API
| Service | Purpose |
|---------|---------|
| MoMo Gateway | Payment processing |
| MoMo IPN | Payment notification |

---

## 📋 Component Details

### Payment Component (`payment.component.ts`)

```typescript
export class PaymentComponent {
  amount: number = 50000;           // Số tiền mặc định
  fullName: string = '';             // Họ tên người dùng
  email: string = '';                // Email
  phone: string = '';                // Số điện thoại
  loading: boolean = false;          // Trạng thái loading
  errorMsg: string = '';             // Thông báo lỗi
  successMsg: string = '';           // Thông báo thành công

  payWithMoMo()                      // Xử lý thanh toán
  resetForm()                        // Xóa form
}
```

### Payment Result Component (`payment-result.component.ts`)

```typescript
export class PaymentResultComponent implements OnInit {
  resultCode: string | null = null;  // Mã kết quả từ MoMo
  message: string | null = null;     // Thông báo kết quả
  orderId: string | null = null;     // Mã đơn hàng
  amount: string | null = null;      // Số tiền
  isSuccess: boolean = false;        // Flag thành công/thất bại
  transId: string | null = null;     // ID giao dịch

  ngOnInit()                         // Đọc query params
  goBackToHome()                     // Quay về trang chủ
  retryPayment()                     // Thử lại thanh toán
}
```

---

## 🔐 Security Implementation

### Signature Generation (HMAC SHA256)

```javascript
const crypto = require("crypto");

function generateSignature(data, secretKey) {
  return crypto.createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");
}

// Data format:
// accessKey=xxx&amount=xxx&...&signature=xxx
const rawData = `accessKey=${accessKey}&amount=${amount}&...`;
const signature = generateSignature(rawData, secretKey);
```

### CORS Configuration

```javascript
app.use(cors());
// Hoặc cụ thể:
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
```

---

## 📊 API Reference

### POST /api/payment/momo

**Request:**
```json
{
  "amount": 100000,
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0987654321",
  "orderId": "ORDER_1234567890",
  "orderInfo": "Thanh toán đơn hàng",
  "returnUrl": "http://localhost:4200/payment-result"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Tạo yêu cầu thanh toán thành công",
  "payUrl": "https://test-payment.momo.vn/w/...",
  "requestId": "MOMO_1234567890",
  "orderId": "ORDER_1234567890"
}
```

**Error Response (400/500):**
```json
{
  "status": "error",
  "message": "Chi tiết lỗi",
  "error": "Error details"
}
```

### POST /api/payment/momo/ipn

**IPN Payload từ MoMo:**
```json
{
  "partnerCode": "MOMO",
  "orderId": "ORDER_1234567890",
  "requestId": "MOMO_1234567890",
  "amount": 100000,
  "orderInfo": "Thanh toán đơn hàng",
  "orderType": "momo_wallet",
  "transId": "2104290210",
  "resultCode": 0,
  "message": "Successful.",
  "payType": "wallet",
  "responseTime": "2024-01-20T10:30:45Z",
  "extraData": "{...}",
  "signature": "xxxxx"
}
```

### GET /api/payment/status/:orderId

**Request:**
```
GET http://localhost:3000/api/payment/status/ORDER_1234567890
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "orderId": "ORDER_1234567890",
    "status": "completed",
    "amount": 100000,
    "createdAt": "2026-03-04T10:30:45Z"
  }
}
```

---

## 🧪 Testing

### Manual Testing

1. **Test Payment Flow:**
   - Vào http://localhost:4200/payment
   - Điền thông tin
   - Nhấn "Thanh Toán với MoMo"
   - Kiểm tra redirect đến MoMo

2. **Test Error Handling:**
   - Bỏ trống một field → Thông báo lỗi
   - Nhập số tiền < 10,000 → Lỗi
   - Server offline → CORS error

3. **Test Result Page:**
   - Vào http://localhost:4200/payment-result?resultCode=0
   - Kiểm tra hiển thị thành công

### API Testing with Postman

1. **Create Payment Request:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/payment/momo`
   - Body:
     ```json
     {
       "amount": 50000,
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "0987654321",
       "orderId": "ORDER_TEST_001",
       "orderInfo": "Test Payment"
     }
     ```

2. **Check Payment Status:**
   - Method: `GET`
   - URL: `http://localhost:3000/api/payment/status/ORDER_TEST_001`

---

## 📱 UI/UX Features

### Payment Form
- ✓ Real-time validation
- ✓ Clear error messages
- ✓ Loading spinner
- ✓ Disabled buttons during processing
- ✓ Form reset capability

### Payment Result
- ✓ Success/Error indication (Color-coded)
- ✓ Transaction details display
- ✓ "Back to Home" button
- ✓ "Retry" button for failed payments
- ✓ Responsive design

### Styling
- Modern gradient background
- Smooth animations
- Card-based layout
- Touch-friendly buttons
- Mobile-first design

---

## 🚀 Deployment Notes

### For Production

1. **Update Credentials:**
   ```javascript
   // Change from test to production
   endpoint: "https://payment.momo.vn/v2/gateway"
   // Add production credentials
   ```

2. **Update URLs:**
   ```javascript
   // Change localhost to domain
   redirectUrl: "https://yourdomain.com/payment-result"
   ipnUrl: "https://yourdomain.com/api/payment/momo/ipn"
   ```

3. **Enable HTTPS:**
   ```javascript
   app.use(cors({
     origin: "https://yourdomain.com"
   }));
   ```

4. **Environment Variables:**
   ```bash
   NODE_ENV=production
   MOMO_PARTNER_CODE=prod_code
   MOMO_ACCESS_KEY=prod_key
   MOMO_SECRET_KEY=prod_secret
   ```

5. **Database Integration:**
   - Thêm logic lưu trữ thanh toán
   - Cập nhật IPN webhook
   - Gửi email xác nhận

---

## 🐛 Known Issues & Fixes

| Issue | Solution |
|-------|----------|
| CORS error | Ensure server is running, check cors() middleware |
| Cannot find module | Run `npm install` in my-server |
| Port already in use | Kill process on port 3000 |
| Routes not working | Add routes to app.routes.ts |
| Missing HttpClient | Import HttpClientModule in app.ts |

---

## 📚 Resources

- [MoMo Developer Docs](https://developers.momo.vn/)
- [Express.js Guide](https://expressjs.com/)
- [Angular Documentation](https://angular.io/docs)
- [HMAC SHA256](https://en.wikipedia.org/wiki/HMAC)

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-04 | Initial release with MoMo integration |

---

## 📞 Support

Có vấn đề? Hãy:
1. Kiểm tra HUONG_DAN_MOMO_PAYMENT.md
2. Xem Console logs (F12)
3. Kiểm tra Network requests
4. Đảm bảo credentials đúng
5. Xem MoMo documentation

---

**Enjoy! 🎉**
