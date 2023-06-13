const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db');

const app = express();
const port = 3000; // Change this to the desired port number

app.use(cors());
app.use(express.json());

// Define API endpoints

app.get('/api/cars', async (req, res) => {
  const db = await connectToDatabase();
  const carsCollection = db.collection('cars');

  try {
    const cars = await carsCollection.find().toArray();
    res.json(cars);
  } catch (error) {
    console.error('Failed to fetch cars', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

app.get('/api/filters', async (req, res) => {
  const db = await connectToDatabase();
  const carsCollection = db.collection('cars');

  try {
    const companies = await carsCollection.distinct('company');
    const driveTypes = await carsCollection.distinct('driveType');
    const vehicleTypes = await carsCollection.distinct('vehicleType');
    const seats = await carsCollection.distinct('seats');

    res.json({ companies, driveTypes, vehicleTypes, seats });
  } catch (error) {
    console.error('Failed to fetch filters', error);
    res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

// Add more API endpoints as needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
