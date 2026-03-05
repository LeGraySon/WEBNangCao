const { MongoClient } = require('mongodb');

async function insertTestData() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  
  try {
    await client.connect();
    console.log("✓ Connected to MongoDB");
    
    const database = client.db("FashionData");
    const fashionCollection = database.collection("Fashion");
    
    // Clear existing data
    await fashionCollection.deleteMany({});
    console.log("✓ Cleared existing fashions");
    
    // Insert test data
    const testData = [
      {
        style: "Casual",
        fashion_subject: "Summer T-Shirt",
        fashion_detail: "100% cotton, comfortable and breathable",
        fashion_image: "https://via.placeholder.com/200?text=TShirt"
      },
      {
        style: "Formal",
        fashion_subject: "Business Suit",
        fashion_detail: "Premium wool blend, professional look",
        fashion_image: "https://via.placeholder.com/200?text=Suit"
      },
      {
        style: "Sports",
        fashion_subject: "Running Shoes",
        fashion_detail: "Lightweight and supportive for marathons",
        fashion_image: "https://via.placeholder.com/200?text=Shoes"
      },
      {
        style: "Casual",
        fashion_subject: "Denim Jeans",
        fashion_detail: "Classic blue denim, perfect fit",
        fashion_image: "https://via.placeholder.com/200?text=Jeans"
      },
      {
        style: "Formal",
        fashion_subject: "Evening Dress",
        fashion_detail: "Elegant design with silk fabric",
        fashion_image: "https://via.placeholder.com/200?text=Dress"
      }
    ];
    
    const result = await fashionCollection.insertMany(testData);
    console.log(`✓ Inserted ${result.insertedCount} fashion items`);
    
    // Verify
    const count = await fashionCollection.countDocuments();
    console.log(`✓ Total fashions in database: ${count}`);
    
  } catch (error) {
    console.error("✗ Error:", error.message);
  } finally {
    await client.close();
    process.exit(0);
  }
}

insertTestData();
