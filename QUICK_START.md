# ⚡ Quick Start - Chạy MoMo Payment trong 5 phút

## 🎯 Mục Tiêu
Sau 5 phút, bạn sẽ có hệ thống thanh toán MoMo chạy hoàn toàn trên local.

---

## ⏱️ Bước 1: Chuẩn Bị (30 giây)

### Yêu Cầu
- ✅ Node.js v14+ đã cài đặt
- ✅ npm/yarn
- ✅ Port 3000 & 4200 trống
- ✅ Editor (VS Code)

### Kiểm Tra
```bash
node --version    # v14.0.0 trở lên
npm --version     # 6.0.0 trở lên
```

---

## 🚀 Bước 2: Cài Đặt Dependencies (1 phút)

### Terminal 1 - Server
```bash
cd my-server
npm install
```

### Terminal 2 - App (sau Terminal 1 xong)
```bash
cd my-app
npm install
```

✅ **Chỉ cần làm một lần!**

---

## 🔐 Bước 3: Cấu Hình MoMo (30 giây)

### Mở file: `my-server/index.js`

Tìm dòng này (khoảng dòng 13):
```javascript
const MOMO_CONFIG = {
  partnerCode: "MOMO",
  accessKey: "F8590A41996C23F34",
  secretKey: "7862E3F3FD4D3D3DE33B3D3D3F3F3F3F",
  ...
}
```

**Thay bằng credentials của bạn:**
```javascript
const MOMO_CONFIG = {
  partnerCode: "YOUR_PARTNER_CODE",      // ← Thay
  accessKey: "YOUR_ACCESS_KEY",           // ← Thay
  secretKey: "YOUR_SECRET_KEY",           // ← Thay
  ...
}
```

> 💡 Lấy từ [MoMo Merchant](https://business.momo.vn/en/developers)

✅ **Save (Ctrl+S)**

---

## ▶️ Bước 4: Chạy Server (20 giây)

### Terminal 1:
```bash
cd my-server
npm start
```

**Nếu thành công, bạn sẽ thấy:**
```
============================================================
🚀 SERVER RUNNING ON PORT 3000
📍 Local: http://localhost:3000

💳 MoMo Payment Configuration:
   Partner Code: MOMO
   Environment: TEST
============================================================
```

✅ **Server ready!**

---

## ▶️ Bước 5: Chạy Angular App (1 phút)

### Terminal 2:
```bash
cd my-app
ng serve
```

Hoặc nếu chưa cài Angular CLI:
```bash
npx ng serve
```

**Chờ đến khi thấy:**
```
✔ Compiled successfully.
✔ Compiled successfully.

  ➜  Local:   http://localhost:4200/
```

✅ **App ready!**

---

## 🎉 Bước 6: Test (1 phút)

### 1️⃣ Mở Browser
```
http://localhost:4200/payment
```

### 2️⃣ Điền Thông Tin
```
Họ và Tên:    John Doe
Email:        john@example.com
Số ĐT:        0987654321
Số tiền:      50000 VND
```

### 3️⃣ Nhấn "💳 Thanh Toán với MoMo"

### 4️⃣ Kết Quả
- ✅ Nếu chuyển hướng đến MoMo → **Thành công!**
- ❌ Nếu lỗi → Kiểm tra credentials & server logs

---

## 📊 Kiểm Tra Nhanh

### Test 1: Server hoạt động?
```
Browser: http://localhost:3000/test
Kết quả: {"status":"success","message":"SERVER OK"}
```

### Test 2: Frontend load?
```
Browser: http://localhost:4200/payment
Kết quả: Form thanh toán hiển thị
```

### Test 3: CORS hoạt động?
```
F12 → Console, chạy:
fetch('http://localhost:3000/test')
  .then(r => r.json())
  .then(d => console.log('✓ OK:', d))
```

---

## 🆘 Lỗi Thường Gặp

| Lỗi | Giải Pháp |
|-----|----------|
| Cannot POST /api/payment/momo | Server chưa chạy → `npm start` |
| CORS error | Kiểm tra url server (http://localhost:3000) |
| Port 3000 in use | Kill process: `netstat -ano \| findstr :3000` |
| Module not found | `npm install` lại |
| ng: command not found | `npm install -g @angular/cli` |

---

## 📱 Điều Gì Xảy Ra Khi Bạn Thanh Toán?

```
1. You → Điền form → Nhấn nút thanh toán
   ↓
2. Frontend → POST http://localhost:3000/api/payment/momo
   ↓
3. Backend → Tạo signature HMAC SHA256
   ↓
4. Backend → POST request tới MoMo Gateway
   ↓
5. MoMo → Trả về payment URL
   ↓
6. Frontend → Redirect window.location.href = payUrl
   ↓
7. You → Nhập thông tin ví MoMo
   ↓
8. MoMo → Redirect về http://localhost:4200/payment-result
   ↓
9. Result Page → Hiển thị kết quả thanh toán
```

---

## 🎓 Các Tệp Quan Trọng

| File | Mục Đích |
|------|---------|
| `my-server/index.js` | API server chính |
| `my-app/src/app/payment/payment.component.ts` | Trang thanh toán logic |
| `my-app/src/app/payment/payment.component.html` | Trang thanh toán UI |
| `my-app/src/app/app.routes.ts` | Routes config |
| `HUONG_DAN_MOMO_PAYMENT.md` | Hướng dẫn chi tiết |

---

## 🔄 Lần Sau Chỉ Cần 30 Giây

```bash
# Terminal 1
cd my-server && npm start

# Terminal 2 (sau 5 giây)
cd my-app && ng serve

# Browser
http://localhost:4200/payment
```

✨ **Done!**

---

## 📚 Học Thêm

- Xem `HUONG_DAN_MOMO_PAYMENT.md` để chi tiết
- Xem `MOMO_PAYMENT_README.md` để kỹ thuật
- Xem MoMo Docs: https://developers.momo.vn/

---

## ✅ Checklist

- [ ] Node.js v14+ cài đặt
- [ ] `npm install` trong my-server & my-app
- [ ] Cập nhật MOMO_CONFIG credentials
- [ ] Server chạy (http://localhost:3000/test)
- [ ] App chạy (http://localhost:4200)
- [ ] Test payment form

---

**Tất Cả Bạn Cần Là 5 Phút! 🚀**
