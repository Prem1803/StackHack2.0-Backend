const express = require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();

// Import Routes 
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

// Database Connetion
connectDB()

// Routes middleware
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})