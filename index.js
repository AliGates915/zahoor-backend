const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db'); // Import connectDB here

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"], 
   credentials: true
}));
app.use(cookieParser());

connectDB().then(() => {
  console.log('Database connection established');

  // Import routes after the database connection is ready
  const { UserRouter } = require('./routes/user');
  const { AdminRouter } = require('./routes/admin');
  const { CompanyRouter } = require('./routes/company');

  app.use('/api', UserRouter);
  app.use('/api/admin', AdminRouter);
  app.use('/api/', CompanyRouter);

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
app.listen(process.env.PORT,   ()=> {
  console.log('Server is running on port 3000');
})
module.exports = app;
}).catch((error) => {
  console.error('Failed to connect to the database', error);
  process.exit(1);
});

