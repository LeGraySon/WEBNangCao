const express = require('express');
const app = express();
const port = 3002;  // Cais nay laf port
const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient("mongodb://127.0.0.1:27017");
let database;
let fashionCollection;

async function startServer() {
  try {
    await client.connect();
    console.log("✓ Connected to MongoDB");
    
    database = client.db("FashionData");
    fashionCollection = database.collection("Fashion");
    
    // Verify connection
    await database.command({ ping: 1 });
    console.log("✓ Ping MongoDB successfully");

    // ===== ROOT =====
    app.get("/", (req, res) => {
      res.json({ message: "Fashion Server Running on port 3002", database: "FashionData" });
    });

    // ===== FASHIONS ENDPOINTS =====
    
    app.get("/fashions", async (req, res) => {
      try {
        const result = await fashionCollection.find({}).toArray();
        res.json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.get("/fashions/:id", async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid fashion id" });
        }

        const result = await fashionCollection.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return res.status(404).json({ success: false, error: "Fashion not found" });
        }

        res.json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.post("/fashions", async (req, res) => {
      try {
        const result = await fashionCollection.insertOne(req.body);
        res.json({ success: true, insertedId: result.insertedId });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.put("/fashions/:id", async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid fashion id" });
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

    app.delete("/fashions/:id", async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid fashion id" });
        }

        const result = await fashionCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ success: true, deletedCount: result.deletedCount });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ===== HEALTH CHECK =====
    app.get("/health", async (req, res) => {
      try {
        await database.command({ ping: 1 });
        res.json({ status: "OK", message: "Server is running" });
      } catch (error) {
        res.status(500).json({ status: "ERROR", error: error.message });
      }
    });

    // Start listening
    app.listen(port, () => {
      console.log(`✓ Server listening on http://localhost:${port}`);
      console.log(`✓ Fashions endpoint: http://localhost:${port}/fashions`);
    });
  } catch (error) {
    console.error("✗ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  await client.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

startServer();
