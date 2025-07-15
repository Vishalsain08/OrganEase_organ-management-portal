const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const organRoutes = require('./routes/organRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
connectDB(); // 🔗 Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organs', organRoutes);
app.use('/api/requests', requestRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
