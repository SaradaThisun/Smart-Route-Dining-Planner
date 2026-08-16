// server.js
// Entry point for the TravelTaste backend API

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recommendRoute = require('./routes/recommend');
const restaurantsRoute = require('./routes/restaurants');
const searchRoute = require('./routes/search');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint (useful to confirm server is running)
app.get('/', (req, res) => {
  res.json({ message: 'TravelTaste API is running' });
});

// API Routes
app.use('/recommend', recommendRoute);
app.use('/restaurants', restaurantsRoute);
app.use('/search', searchRoute);

app.listen(PORT, () => {
  console.log(`TravelTaste backend running on http://localhost:${PORT}`);
});