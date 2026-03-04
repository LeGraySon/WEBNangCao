const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
const port = 3000;

// ========================
// MOMO PAYMENT CONFIGURATION
// ========================
// Test credentials (No business account needed)
// Source: Official MoMo Test Sandbox
const MOMO_CONFIG = {
  partnerCode: "MOMO",
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  endpoint: "https://test-payment.momo.vn/v2/gateway/api/create",
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files
app.use(express.static("public"));

// ========================
// TEST ENDPOINT
// ========================
app.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "SERVER OK",
    timestamp: new Date().toISOString(),
  });
});

// ========================
// MOMO PAYMENT API
// ========================

/**
 * Hàm tạo chữ ký HMAC SHA256
 * @param {string} data - Dữ liệu cần mã hóa
 * @param {string} key - Secret key
 * @returns {string} - Chữ ký HMAC SHA256
 */
function generateSignature(data, key) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

/**
 * API tạo yêu cầu thanh toán MoMo
 * POST /payment/momo
 */
app.post("/payment/momo", async (req, res) => {
  try {
    const { amount, fullName, email, phone, orderId, orderInfo } = req.body;

    // Validate input
    if (!amount || amount < 10000) {
      return res.status(400).json({
        error: "Amount must be at least 10,000 VND",
      });
    }

    // Generate request data
    const requestId = `${MOMO_CONFIG.partnerCode}${Date.now()}`;
    const redirectUrl = req.body.returnUrl || "http://localhost:4200/payment-result";
    const ipnUrl = "https://callback.url/notify";
    const requestType = "captureWallet";
    const extraData = "";

    // Create raw signature exactly as MoMo expects
    const rawSignature = `accessKey=${MOMO_CONFIG.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_CONFIG.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Create signature using HMAC SHA256
    const signature = generateSignature(rawSignature, MOMO_CONFIG.secretKey);

    // Request body
    const requestBody = {
      partnerCode: MOMO_CONFIG.partnerCode,
      requestId: requestId,
      amount: Number(amount),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: "vi",
      requestType: requestType,
      extraData: extraData,
      signature: signature,
    };

    console.log("-------------------");
    console.log("Raw Signature:", rawSignature);
    console.log("Signature Hash:", signature);
    console.log("-------------------");

    // Send request to MoMo
    const response = await axios.post(MOMO_CONFIG.endpoint, requestBody);

    console.log("MoMo Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("MoMo payment error:", error.message);
    if (error.response) {
      console.error("Error response data:", JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({
      error: "Failed to create MoMo payment",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * IPN Webhook - MoMo gửi kết quả thanh toán về
 * POST /payment/momo/ipn
 */
app.post("/payment/momo/ipn", (req, res) => {
  try {
    console.log("MoMo IPN Callback received:", req.body);
    // In production, verify signature here
    res.status(200).json({
      status: "received"
    });
  } catch (error) {
    console.error("IPN Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Check payment status
 * GET /payment/status/:orderId
 */
app.get("/payment/status/:orderId", (req, res) => {
  try {
    const { orderId } = req.params;
    
    // TODO: Query database to get payment status
    const paymentStatus = {
      orderId: orderId,
      status: "pending",
      amount: 50000,
      createdAt: new Date().toISOString(),
    };

    return res.json({
      status: "success",
      data: paymentStatus,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// ========================
// ERROR HANDLING
// ========================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "API endpoint not found",
  });
});

// ========================
// START SERVER
// ========================
app.listen(port, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 SERVER RUNNING ON PORT ${port}`);
  console.log(`📍 Local: http://localhost:${port}`);
  console.log(`\n💳 MoMo Payment Configuration:`);
  console.log(`   Partner Code: ${MOMO_CONFIG.partnerCode}`);
  console.log(`   Environment: TEST (No Business Account Needed)`);
  console.log(`${"=".repeat(60)}\n`);
});
