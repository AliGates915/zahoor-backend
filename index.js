const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { UserRouter } = require('./routes/user');
const { AdminRouter } = require('./routes/admin');
const { connectDB } = require('./config/db');
const { CompanyRouter } = require('./routes/company');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"], 
   credentials: true
}));
app.use(cookieParser());
app.use('/api', UserRouter);
app.use('/api/admin', AdminRouter); 
app.use('/api/', CompanyRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Connect to the database 
connectDB()
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });

module.exports = app;
