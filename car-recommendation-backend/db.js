const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Cluster98446:zgwN6MArWNiV8H7C@cluster0.ufs3xeq.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URI
const dbName = 'car_database'; // Name of your database

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
