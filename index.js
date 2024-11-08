import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';

config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(json());
app.use(cookieParser());

connectDB().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Failed to connect to the database', error);
  process.exit(1);
});

// const { UserRouter } = require('./routes/user');
// const { AdminRouter } = require('./routes/admin');
// const { CompanyRouter } = require('./routes/company');

// app.use('/api', UserRouter);
// app.use('/api/admin', AdminRouter);
// app.use('/api/', CompanyRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// handle the HTTP server
export default app;
