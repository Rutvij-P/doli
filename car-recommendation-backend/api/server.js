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

  app.get('/api/recommendations', async (req, res) => {
    const { companies, driveTypes, vehicleTypes, seats } = req.query;
  
    const db = await connectToDatabase();
    const carsCollection = db.collection('cars');
  
    try {
      const query = {};
  
      // Add filters based on user's form submission
      if (companies) {
        query.company = { $in: companies.split(',') };
      }
      if (driveTypes) {
        query.driveType = { $in: driveTypes.split(',') };
      }
      if (vehicleTypes) {
        query.vehicleType = { $in: vehicleTypes.split(',') };
      }
      if (seats) {
        query.seats = { $in: seats.split(',') };
      }
  
      const cars = await carsCollection.find(query).toArray();
      res.json(cars);
    } catch (error) {
      console.error('Failed to fetch recommended cars', error);
      res.status(500).json({ error: 'Failed to fetch recommended cars' });
    }
  });
  