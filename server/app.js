const express = require('express');
const { connectDB } = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const config = require('./config/config');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Food Diary API is running in ${config.nodeEnv} mode`);
});

app.use('/api/food', foodRoutes);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.port}`);
});