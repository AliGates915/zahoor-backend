const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Failed to connect to the database', error);
  process.exit(1);
});

const { UserRouter } = require('./routes/user');
const { AdminRouter } = require('./routes/admin');
const { CompanyRouter } = require('./routes/company');

app.use('/api', UserRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/', CompanyRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// handle the HTTP server
module.exports = app;
