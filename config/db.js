const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let client;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Reusing existing database connection');
    return;
  }
  
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
    throw error;
  }
};

const getAuthDB = () => {
  if (!client) {
    throw new Error('Client is not connected to the database');
  }
  return client.db('auth');
};

const getCustomerDB = () => {
  if (!client) {
    throw new Error('Client is not connected to the database');
  }
  return client.db('customer');
};

module.exports = { connectDB, getAuthDB, getCustomerDB };
