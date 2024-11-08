const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const { UserRouter } = require('./routes/user');
const { AdminRouter } = require('./routes/admin');
const { CompanyRouter } = require('./routes/company');



config();

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await connectDB(); // Ensure the DB connection is established
    console.log('Database connected. Initializing routes...');
    
    app.use('/api', UserRouter);
    app.use('/api/admin', AdminRouter);
    app.use('/api', CompanyRouter);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit process if connection fails
  }
})();

    // Import routes after DB connection is established



app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Do not use app.listen() for Vercel deployment
module.exports = app; // Ensure the app is exported
