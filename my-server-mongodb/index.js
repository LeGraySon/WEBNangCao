const express = require('express');
const app = express();
const port = 3002;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('combined'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
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

const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017', {
  serverSelectionTimeoutMS: 5000,
});

let database = null;
let fashionCollection = null;
let userCollection = null;

async function seedSampleUsers() {
  if (!userCollection) return;

  await userCollection.createIndex({ username: 1 }, { unique: true });
  const samples = [
    {
      username: 'tranduythanh',
      password: '12345678',
      fullName: 'Tran Duy Thanh',
      role: 'student',
    },
    {
      username: 'admin',
      password: 'admin123',
      fullName: 'System Admin',
      role: 'admin',
    },
  ];

  for (const sample of samples) {
    await userCollection.updateOne(
      { username: sample.username },
      {
        $set: {
          password: sample.password,
          fullName: sample.fullName,
          role: sample.role,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  }

  console.log('Sample users synced into User collection');
}

async function connectMongo() {
  try {
    await client.connect();
    database = client.db('FashionData');
    fashionCollection = database.collection('Fashion');
    userCollection = database.collection('User');

    await database.command({ ping: 1 });
    await seedSampleUsers();

    console.log('Connected to MongoDB (FashionData)');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Cookie routes still available at /create-cookie, /read-cookie, /delete-cookie');
  }
}

function requireMongo(res) {
  if (!database) {
    res.status(503).json({
      success: false,
      error: 'MongoDB is not connected. Please start MongoDB and restart server.',
    });
    return false;
  }
  return true;
}

function getLoginCookie(req) {
  const raw = req.cookies?.loginUser;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

app.get('/', (req, res) => {
  res.json({
    message: 'Fashion Server Running on port 3002',
    database: 'FashionData',
    authApi: 'POST /api/auth/login',
  });
});

// ===== LOGIN REST API (POST) =====
app.post('/api/auth/login', async (req, res) => {
  if (!requireMongo(res)) return;

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'username and password are required',
      });
    }

    const user = await userCollection.findOne({ username, password });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const loginUser = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      loginAt: new Date().toISOString(),
    };

    res.cookie('loginUser', JSON.stringify(loginUser), {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax',
    });

    return res.json({
      success: true,
      message: 'Login successful',
      user: loginUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Read login cookie for displaying on login page
app.get('/api/auth/me', (req, res) => {
  const loginUser = getLoginCookie(req);

  if (!loginUser) {
    return res.json({
      success: true,
      loggedIn: false,
      user: null,
    });
  }

  return res.json({
    success: true,
    loggedIn: true,
    user: loginUser,
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('loginUser');
  res.json({ success: true, message: 'Logged out' });
});

// Demo page like exercise screenshot
app.get('/login', (req, res) => {
  const loginUser = getLoginCookie(req);
  if (!loginUser) {
    return res.send('You are not logged in');
  }

  return res.send('User logged in');
});

// ===== COOKIE (Bai 60) =====
app.get('/create-cookie', (req, res) => {
  res.cookie('username', 'khanh');
  res.cookie('role', 'admin');
  res.cookie('account', { username: 'khanh', role: 'admin' });
  res.send('Cookies created');
});

app.get('/read-cookie', (req, res) => {
  res.json(req.cookies);
});

app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');
  res.clearCookie('role');
  res.clearCookie('account');
  res.send('Cookies deleted');
});

// ===== FASHION CRUD =====
app.get('/fashions', async (req, res) => {
  if (!requireMongo(res) || !fashionCollection) return;
  try {
    const result = await fashionCollection.find({}).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/fashions/:id', async (req, res) => {
  if (!requireMongo(res) || !fashionCollection) return;
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid fashion id' });
    }

    const result = await fashionCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ success: false, error: 'Fashion not found' });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/fashions', async (req, res) => {
  if (!requireMongo(res) || !fashionCollection) return;
  try {
    const result = await fashionCollection.insertOne(req.body);
    res.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/fashions/:id', async (req, res) => {
  if (!requireMongo(res) || !fashionCollection) return;
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid fashion id' });
    }

    const result = await fashionCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/fashions/:id', async (req, res) => {
  if (!requireMongo(res) || !fashionCollection) return;
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid fashion id' });
    }

    const result = await fashionCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', async (req, res) => {
  if (!database) {
    return res.status(503).json({ status: 'ERROR', error: 'MongoDB is not connected' });
  }

  try {
    await database.command({ ping: 1 });
    res.json({ status: 'OK', message: 'Server is running', mongo: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log('Login API: POST http://localhost:3002/api/auth/login');
  console.log('Read cookie: GET  http://localhost:3002/api/auth/me');
  console.log(`Fashions endpoint: http://localhost:${port}/fashions`);
});

connectMongo();

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
