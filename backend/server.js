// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const connectDB = require('./config/db'); // Import the DB connection

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use('/api/users', userRoutes);
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('PinIt Backend is running!');
});

const PORT = process.env.PORT || 5000;
const pinRoutes = require('./routes/pins');
app.use('/api/pins', pinRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;