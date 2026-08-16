// server.js
// Entry point for the TravelTaste backend API

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recommendRoute = require('./routes/recommend');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint (useful to confirm server is running)
app.get('/', (req, res) => {
  res.json({ message: 'TravelTaste API is running' });
});

app.use('/recommend', recommendRoute);

app.listen(PORT, () => {
  console.log(`TravelTaste backend running on http://localhost:${PORT}`);
});