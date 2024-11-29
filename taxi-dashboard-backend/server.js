const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();

// Middleware untuk mengizinkan request dari domain yang berbeda
app.use(cors());
app.use(express.json());

// API untuk mendapatkan trip data dengan filter
app.get('/api/trips', async (req, res) => {
  try {
    const { start_time, end_time, min_fare, max_fare, min_distance, max_distance } = req.query;

    // Query SQL untuk mengambil data trips sesuai dengan filter yang diberikan
    let query = `
      SELECT pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude, fare_amount, trip_distance, pickup_datetime
      FROM taxi_trips
      WHERE (pickup_datetime >= $1 AND pickup_datetime <= $2)
      AND (fare_amount >= $3 AND fare_amount <= $4)
      AND (trip_distance >= $5 AND trip_distance <= $6)
    `;
    
    const values = [
      start_time || '2020-01-01', 
      end_time || '2024-12-10',   
      min_fare || 0,
      max_fare || 1000,
      min_distance || 0,
      max_distance || 1000,
    ];

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trips data:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
