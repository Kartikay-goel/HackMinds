require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Connect to Database
connectDB();

// 3. Mount Routes
// This means every route in projectRoutes.js gets prefixed with '/api'
app.use('/api', projectRoutes);

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`System Online. Core Server running on port ${PORT}`));