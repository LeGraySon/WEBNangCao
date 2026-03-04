# ⚡ MoMo Payment Setup - No Business Account Needed!

## 🎯 What You Need to Know

✅ **NO business account required**  
✅ **Uses official MoMo test sandbox credentials**  
✅ **Works on localhost immediately**  
✅ **Based on 98tttm/WebNC repository**

---

## 📋 Quick Setup (3 Steps)

### Step 1: Install Dependencies (1 minute)

```bash
# Terminal 1 - Server
cd my-server
npm install

# Terminal 2 - App
cd my-app
npm install
```

### Step 2: Run Server (30 seconds)

```bash
cd my-server
npm start
```

**Expected output:**
```
============================================================
🚀 SERVER RUNNING ON PORT 3000
📍 Local: http://localhost:3000

💳 MoMo Payment Configuration:
   Partner Code: MOMO
   Environment: TEST (No Business Account Needed)
============================================================
```

### Step 3: Run App (30 seconds)

```bash
cd my-app
ng serve
```

**Then open:** `http://localhost:4200/payment`

---

## 🔐 Test Credentials (Already Configured)

These are **official MoMo test sandbox credentials**:

```javascript
Partner Code:  MOMO
Access Key:    F8BBA842ECF85
Secret Key:    K951B6PE1waDMi640xX08PD3vg6EkVlz
Environment:   https://test-payment.momo.vn/v2/gateway/api/create
```

✅ **No need to change anything!**  
✅ **Already configured in your server**

---

## 💳 How to Test Payment

### 1. Open Payment Page
```
http://localhost:4200/payment
```

### 2. Fill Form
```
Họ và Tên:    John Doe
Email:        john@example.com
Số ĐT:        0987654321
Số tiền:      50000 VND (min: 10,000)
```

### 3. Click "💳 Thanh Toán với MoMo"

### 4. Redirect to MoMo Test Gateway
- You'll be redirected to MoMo test payment page
- Use MoMo **test credentials** (not real money)
- MoMo will provide test card info on the page

### 5. View Result
- Success: Green page with transaction details
- Failed: Red page with option to retry

---

## 🌐 API Endpoints

### Create Payment Request
```
POST http://localhost:3000/payment/momo

Request Body:
{
  "amount": 50000,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "0987654321",
  "orderId": "ORDER_1234567890",
  "orderInfo": "Thanh toán đơn hàng",
  "returnUrl": "http://localhost:4200/payment-result"
}

Response:
{
  "partnerCode": "MOMO",
  "requestId": "MOMO...",
  "resultCode": 0,
  "message": "Success.",
  "payUrl": "https://test-payment.momo.vn/w/...",
  "signature": "...",
  "orderId": "ORDER_1234567890"
}
```

### IPN Webhook
```
POST http://localhost:3000/payment/momo/ipn
(MoMo calls this to notify payment result)
```

### Check Status
```
GET http://localhost:3000/payment/status/:orderId
```

---

## ✅ Verify Everything Works

### Test 1: Server Running?
```bash
curl http://localhost:3000/test
# Should return: {"status":"success","message":"SERVER OK"}
```

### Test 2: App Running?
```
Browser: http://localhost:4200/payment
# Should show form
```

### Test 3: CORS Working?
```javascript
// Open F12 Console and run:
fetch('http://localhost:3000/test')
  .then(r => r.json())
  .then(d => console.log('✓ CORS OK:', d))
  .catch(e => console.error('✗ Error:', e))
```

---

## 📁 Files Changed

### Backend (`my-server/`)
- ✅ `index.js` - Updated with test credentials from GitHub repo

### Frontend (`my-app/src/app/`)
- ✅ `payment/payment.component.ts` - Endpoint: `/payment/momo`
- ✅ `payment-result/` - Already configured correctly
- ✅ `app.routes.ts` - Routes already added
- ✅ `app.ts` - HttpClientModule already added

---

## 🔄 Payment Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User fills form & clicks "Thanh Toán với MoMo"      │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  2. POST /payment/momo                                  │
│     • Generate HMAC SHA256 signature                    │
│     • Send to MoMo test gateway                         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  3. MoMo Returns payUrl                                 │
│     window.location.href = payUrl                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  4. User on MoMo Test Payment Page                      │
│     (MoMo provides test card/OTP on page)               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  5. After Payment, MoMo Redirects Back                  │
│     http://localhost:4200/payment-result?...params...  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  6. Payment Result Page Displays                        │
│     ✅ Success (Green) or ❌ Failed (Red)               │
└─────────────────────────────────────────────────────────┘
```

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Cannot POST /payment/momo** | Server not running: `npm start` in my-server |
| **CORS error** | Check URL in code is `http://localhost:3000` |
| **Port 3000 in use** | Kill: `netstat -ano \| findstr :3000` → `taskkill /PID <PID> /F` |
| **Cannot GET /payment** | Routes configured? Check `app.routes.ts` |
| **F12 shows red error** | Open DevTools Network tab, check request/response |

---

## 📊 Environment Details

**From GitHub 98tttm/WebNC:**
- ✅ Partner Code: `MOMO`
- ✅ Access Key: `F8BBA842ECF85`
- ✅ Secret Key: `K951B6PE1waDMi640xX08PD3vg6EkVlz`
- ✅ Endpoint: `https://test-payment.momo.vn/v2/gateway/api/create`
- ✅ Request Type: `captureWallet`

**No authentication needed!**

---

## 🚀 Next Steps (Optional)

### For Development:
- [ ] Add transaction logging
- [ ] Save payments to database
- [ ] Send email notifications

### For Production (Future):
- [ ] Get real MoMo business account
- [ ] Update to production credentials
- [ ] Use HTTPS
- [ ] Add payment verification

---

## 📚 Source

Configuration based on: **98tttm/WebNC** GitHub repository  
- Reference: `my-server-uploadfile/index.js`
- Reference: `my-server-uploadfile/test-momo-final.js`

---

## 🎉 You're All Set!

Just run:
```bash
# Terminal 1
cd my-server && npm start

# Terminal 2
cd my-app && ng serve

# Browser
http://localhost:4200/payment
```

**No business account needed!** 🚀
