const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./src/middlewares/errorHandler');

// Body parsing & middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const restaurantRoutes = require('./src/routes/restaurantRoutes');
const orderRoutes = require('./src/routes/orderRoutes');



// Use routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/orders', orderRoutes);
// Global error handling middleware
app.use(errorHandler);

module.exports = app;
