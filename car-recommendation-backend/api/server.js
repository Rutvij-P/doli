const express = require('express');
const cors = require('cors');
const connectToDatabase = require('../db.js');

const app = express();
const port = 3000; // Replace with your desired port number

app.use(cors({
    origin: 'http://localhost:5174' 
  }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/cars', async (req, res) => {
    const db = await connectToDatabase();
    const carsCollection = db.collection('cars');
  
    try {
      const cars = await carsCollection.find().toArray();
      res.json(cars);
    } catch (error) {
      console.error('Failed to retrieve car database', error);
      res.status(500).json({ error: 'Failed to retrieve car database' });
    }
  });