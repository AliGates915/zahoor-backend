// models/User.js
const { getAuthDB } = require('../config/db');
const bcrypt = require('bcrypt');

const db = getAuthDB();

const User = {
  findAll: async () => {
    return db.collection('users').find({}).toArray();
  },

  findByEmail: async (email) => {
    return db.collection('users').findOne({ email });
  },

  createUser: async (username, profession, phoneNumber, email, address, city, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return db.collection('users').insertOne({
      username,
      profession,
      phoneNumber,
      email,
      address,
      city,
      password: hashPassword,
      isApproved: false, // New field to track approval
    });
  },

  approveUser: async (email) => {
    return db.collection('users').updateOne({ email }, { $set: { isApproved: true } });
  },

  rejectUser: async (email) => {
    return db.collection('users').deleteOne({ email }); // Alternatively, you can update a field to mark rejection
  }
};

module.exports = User;
