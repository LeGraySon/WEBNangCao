# 💳 Hướng Dẫn Cấu Hình và Chạy Hệ Thống Thanh Toán MoMo

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Cấu Hình Credentials](#cấu-hình-credentials)
3. [Cài Đặt Dependencies](#cài-đặt-dependencies)
4. [Chạy Ứng Dụng](#chạy-ứng-dụng)
5. [Kiểm Tra Kết Nối](#kiểm-tra-kết-nối)
6. [Sử Dụng Hệ Thống](#sử-dụng-hệ-thống)
7. [Troubleshooting](#troubleshooting)

---

## 📱 Chuẩn Bị

### Yêu Cầu Hệ Thống
- Node.js v14+ 
- npm hoặc yarn
- Angular CLI
- Port 3000 (Server) và 4200 (Angular App) phải trống

### Tài Khoản MoMo
Bạn cần có:
- **Partner Code**: Mã nhà phát triển từ MoMo
- **Access Key**: Key truy cập API
- **Secret Key**: Key bảo mật

> 💡 Nếu chưa có, đăng ký tại [MoMo Merchant](https://business.momo.vn/en/developers)

---

## 🔐 Cấu Hình Credentials

### Bước 1: Cập nhật Server Configuration

Mở file: `my-server/index.js`

Tìm phần `MOMO_CONFIG` và cập nhật thông tin của bạn:

```javascript
const MOMO_CONFIG = {
  partnerCode: "YOUR_PARTNER_CODE",      // ← Thay bằng Partner Code
  accessKey: "YOUR_ACCESS_KEY",           // ← Thay bằng Access Key
  secretKey: "YOUR_SECRET_KEY",           // ← Thay bằng Secret Key
  endpoint: "https://test-payment.momo.vn/v2/gateway", // ← Test environment
  // endpoint: "https://payment.momo.vn/v2/gateway",    // ← Production (nếu sẵn sàng)
};
```

### Bước 2: Xác Nhận Cấu Hình Frontend

Mở file: `my-app/src/app/payment/payment.component.ts`

Kiểm tra URL server:

```typescript
this.http.post<any>('http://localhost:3000/api/payment/momo', paymentData).subscribe({
```

✅ Đảm bảo server URL là `http://localhost:3000`

---

## 📦 Cài Đặt Dependencies

### Server Dependencies

```bash
cd my-server
npm install
```

Các package sẽ được cài đặt:
- **express**: Framework web
- **cors**: Xử lý CORS
- **morgan**: HTTP request logger
- **axios**: HTTP client
- **crypto**: Tạo chữ ký HMAC SHA256

### Angular App Dependencies

```bash
cd my-app
npm install
```

Nếu chưa cài HttpClient, chạy:

```bash
npm install @angular/common
```

---

## 🚀 Chạy Ứng Dụng

### Cách 1: Chạy từ Terminal Riêng Biệt (Khuyến Khích)

**Terminal 1 - Khởi động Server:**

```bash
cd my-server
npm start
```

Kết quả mong đợi:
```
============================================================
🚀 SERVER RUNNING ON PORT 3000
📍 Local: http://localhost:3000

💳 MoMo Payment Configuration:
   Partner Code: MOMO
   Environment: TEST
============================================================
```

**Terminal 2 - Khởi động Angular App:**

```bash
cd my-app
ng serve
```

Hoặc nếu chưa cài Angular CLI:

```bash
npx ng serve
```

Kết quả mong đợi:
```
✔ Compiled successfully.
⠙ Building...
✔ Compiled successfully.

Application bundle generation complete. [X.XXs]

Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
```

### Cách 2: Chạy Cùng Một Terminal

**Khởi động Server (nền):**

```bash
cd my-server
npm start &
```

**Khởi động Angular App:**

```bash
cd my-app
ng serve
```

---

## ✅ Kiểm Tra Kết Nối

### 1. Test Server API

Mở browser hoặc Postman:

```
GET http://localhost:3000/test
```

Kết quả mong đợi:
```json
{
  "status": "success",
  "message": "SERVER OK",
  "timestamp": "2026-03-04T10:30:45.123Z"
}
```

### 2. Test Angular App

Truy cập: `http://localhost:4200/`

Kiểm tra:
- ✅ Trang chủ load bình thường
- ✅ Không có lỗi trong Console (F12 → Console)
- ✅ Có thể điều hướng đến `/payment`

### 3. Test CORS

Mở DevTools (F12) → Console, chạy:

```javascript
fetch('http://localhost:3000/test')
  .then(res => res.json())
  .then(data => console.log('✓ CORS OK:', data))
  .catch(err => console.error('✗ CORS Error:', err));
```

---

## 💳 Sử Dụng Hệ Thống

### Quy Trình Thanh Toán

#### 1. Vào Trang Thanh Toán
```
http://localhost:4200/payment
```

#### 2. Điền Thông Tin
- **Họ và Tên**: Tên người mua
- **Email**: Email người mua
- **Số điện thoại**: Số ĐT người mua
- **Số tiền**: Số tiền thanh toán (VND)
  - Tối thiểu: 10,000 VND
  - Không có tối đa

#### 3. Nhấn "💳 Thanh Toán với MoMo"

#### 4. Chuyển Hướng
- Ứng dụng sẽ chuyển hướng đến cổng thanh toán MoMo
- Nhập thông tin ví MoMo của bạn
- Xác nhận thanh toán

#### 5. Kết Quả Thanh Toán
- **Thành công**: Hiển thị thông báo xanh với mã đơn hàng
- **Thất bại**: Hiển thị thông báo đỏ, có nút "Thử lại"

### API Endpoints

#### POST /api/payment/momo
**Tạo yêu cầu thanh toán**

Request:
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

Response (Thành công):
```json
{
  "status": "success",
  "message": "Tạo yêu cầu thanh toán thành công",
  "payUrl": "https://test-payment.momo.vn/w/...",
  "requestId": "MOMO_1234567890",
  "orderId": "ORDER_1234567890"
}
```

#### GET /api/payment/status/:orderId
**Kiểm tra trạng thái thanh toán**

```
GET http://localhost:3000/api/payment/status/ORDER_1234567890
```

Response:
```json
{
  "status": "success",
  "data": {
    "orderId": "ORDER_1234567890",
    "status": "pending",
    "amount": 100000,
    "createdAt": "2026-03-04T10:30:45.123Z"
  }
}
```

---

## 🔧 Troubleshooting

### ❌ Lỗi: "Cannot POST /api/payment/momo"

**Nguyên nhân**: Server chưa khởi động

**Giải pháp**:
```bash
cd my-server
npm install
npm start
```

### ❌ Lỗi: "CORS error"

**Nguyên nhân**: CORS chưa được cấu hình

**Giải pháp**:
1. Kiểm tra file `my-server/index.js`
2. Đảm bảo có dòng: `app.use(cors());`
3. Khởi động lại server

### ❌ Lỗi: "port 3000 already in use"

**Giải pháp**: 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

Sau đó khởi động lại server.

### ❌ Lỗi: "Invalid credentials"

**Giải pháp**:
1. Kiểm tra lại Partner Code, Access Key, Secret Key
2. Đảm bảo không có khoảng trắng
3. Kiểm tra môi trường (test/production)

### ❌ "Cannot GET /payment"

**Nguyên nhân**: Route chưa được cấu hình

**Giải pháp**:
1. Mở `my-app/src/app/app.routes.ts`
2. Thêm route:
```typescript
{
  path: 'payment',
  component: PaymentComponent
},
{
  path: 'payment-result',
  component: PaymentResultComponent
}
```

### ❌ Các lỗi khác

**Debug steps**:
1. Mở **DevTools** (F12)
2. Vào **Console** tab
3. Ghi lại lỗi chính xác
4. Kiểm tra **Network** tab để xem request/response
5. Kiểm tra server logs trong terminal

---

## 📊 Theo Dõi Logs

### Server Logs
Terminal server sẽ hiển thị:
```
[timestamp] POST /api/payment/momo
Sending request to MoMo: {...}
MoMo Response: {...}
```

### Browser Console Logs
Mở F12 → Console, sẽ thấy:
```
Payment Result: {
  resultCode: "0",
  message: "Success",
  orderId: "ORDER_...",
  ...
}
```

---

## 🔄 Cập Nhật Thông Tin Thanh Toán

### Thay Đổi Thông Tin MoMo

Chỉnh sửa `my-server/index.js`, phần `MOMO_CONFIG`:

```javascript
const MOMO_CONFIG = {
  partnerCode: "NEW_CODE",
  accessKey: "NEW_ACCESS_KEY",
  secretKey: "NEW_SECRET_KEY",
  endpoint: "https://...", // Test hoặc Production
};
```

Khởi động lại server:
```bash
npm start
```

### Thay Đổi Min/Max Amount

Mở `my-app/src/app/payment/payment.component.html`:

```html
<!-- Thay đổi giá trị min -->
<input type="number" min="50000" ... > <!-- Từ 10000 thành 50000 -->
```

---

## ✨ Tính Năng

### Đã Hỗ Trợ
✅ Thanh toán qua MoMo  
✅ Xác nhận HMAC SHA256  
✅ IPN Webhook  
✅ Lỗi xử lý chi tiết  
✅ Responsive UI  
✅ CORS middleware  

### Sắp Sửa
📋 Lưu trữ thanh toán (Database)  
📧 Email notification  
📱 App notification  
🔐 Thanh toán đã ký  
📊 Dashboard quản lý  

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra lại Credentials
2. Xem Logs trong Terminal
3. Mở DevTools Console
4. Kiểm tra Network requests
5. Tham khảo [MoMo Documentation](https://developers.momo.vn/)

---

## 📝 Ghi Chú

- **Test Mode**: Sử dụng endpoint `https://test-payment.momo.vn/v2/gateway`
- **Production Mode**: Sử dụng endpoint `https://payment.momo.vn/v2/gateway`
- **Không Lộc Credentials**: Đừng commit credentials vào Git
- **CORS Settings**: Có thể cần cấu hình allowedOrigins trong production

---

**Last Updated**: 2026-03-04  
**Version**: 1.0.0  
**Status**: ✅ Ready to Use
