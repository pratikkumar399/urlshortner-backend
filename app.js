// app.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('URL Shortener API is running');
});


// Set the port from environment or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
