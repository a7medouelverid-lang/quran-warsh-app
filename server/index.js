const express = require('express');
const cors = require('cors');
const quranRoutes = require('./routes/quran.js');
const lotteryRoutes = require('./routes/lottery.js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quran', quranRoutes);
app.use('/api/lottery', lotteryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});