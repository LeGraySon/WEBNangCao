const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.DB_NAME || 'FashionData';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Session cart is stored in server memory by default MemoryStore
app.use(
  session({
    secret: 'Shh, it is a secret!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 0, default: 0 },
  },
  { collection: 'Product', timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

async function seedProducts() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  await Product.insertMany([
    {
      name: 'Diamond Promise Ring 1/6 ct',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop',
      description: 'Round-cut 10K White Gold',
      quantity: 20,
    },
    {
      name: 'Diamond Promise Ring 1/4 ct',
      price: 529.0,
      image: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1200&auto=format&fit=crop',
      description: 'Round/Baguette 10K White Gold',
      quantity: 15,
    },
    {
      name: 'Diamond Promise Ring Black/White',
      price: 159.0,
      image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1200&auto=format&fit=crop',
      description: 'Sterling Silver',
      quantity: 50,
    },
    {
      name: 'Diamond Promise Ring 1/5 ct',
      price: 289.0,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      description: 'Round-cut Sterling Silver',
      quantity: 35,
    },
    {
      name: 'Diamond Promise Ring 1/8 ct',
      price: 229.0,
      image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop',
      description: 'Sterling Silver Ring',
      quantity: 40,
    },
  ]);

  console.log('Seeded sample products into Product collection');
}

function ensureCart(req) {
  if (!Array.isArray(req.session.cart)) {
    req.session.cart = [];
  }
  return req.session.cart;
}

app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce session cart API is running',
    apis: ['/products', '/cart/add', '/cart', '/cart/update', '/cart/remove'],
  });
});

// API 1: Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 2: Add product to cart (Session based)
app.post('/cart/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const qtyToAdd = Number(quantity) > 0 ? Number(quantity) : 1;
    const cart = ensureCart(req);
    const existing = cart.find((item) => item.productId === String(product._id));

    if (existing) {
      existing.quantity += qtyToAdd;
    } else {
      cart.push({
        productId: String(product._id),
        name: product.name,
        price: product.price,
        quantity: qtyToAdd,
      });
    }

    req.session.cart = cart;
    res.json({ message: 'Added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 3: Get cart
app.get('/cart', (req, res) => {
  const cart = ensureCart(req);
  res.json(cart);
});

// API 4: Update cart
app.post('/cart/update', (req, res) => {
  const cart = ensureCart(req);
  const updates = Array.isArray(req.body?.updates) ? req.body.updates : [];

  const updateMap = new Map();
  updates.forEach((u) => {
    if (u?.productId) {
      updateMap.set(String(u.productId), Number(u.quantity));
    }
  });

  const nextCart = cart
    .map((item) => {
      if (!updateMap.has(item.productId)) return item;
      const nextQty = updateMap.get(item.productId);
      return { ...item, quantity: Number.isFinite(nextQty) ? nextQty : item.quantity };
    })
    .filter((item) => item.quantity > 0);

  req.session.cart = nextCart;
  res.json({ message: 'Cart updated', cart: nextCart });
});

// API 5: Remove product from cart
app.post('/cart/remove', (req, res) => {
  const cart = ensureCart(req);
  const productIds = Array.isArray(req.body?.productIds) ? req.body.productIds.map(String) : [];

  req.session.cart = cart.filter((item) => !productIds.includes(item.productId));
  res.json({ message: 'Removed selected products', cart: req.session.cart });
});

// Session demo endpoint from previous exercise
app.get('/contact', cors(), (req, res) => {
  if (req.session.visited != null) {
    req.session.visited += 1;
    return res.send(`You visited this page ${req.session.visited} times`);
  }

  req.session.visited = 1;
  return res.send('Welcome to this page for the first time!');
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    await seedProducts();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
