const { getAuthDB } = require('../config/db');
const bcrypt = require('bcrypt');

const User = {

  findByEmail: async (email) => {
    const db = getAuthDB(); 
    return db.collection('users').findOne({ email });
  },

  createUser: async (username, profession, phoneNumber, email, address, city, password) => {
    const db = getAuthDB();
    const hashPassword = await bcrypt.hash(password, 10);
    return db.collection('users').insertOne({
      username,
      profession,
      phoneNumber,
      email,
      address,
      city,
      password: hashPassword,
      isApproved: false, 
    });
  },

  approveUser: async (email) => {
    const db = getAuthDB();
    return db.collection('users').updateOne({ email }, { $set: { isApproved: true } });
  },

  rejectUser: async (email) => {
    const db = getAuthDB();
    return db.collection('users').deleteOne({ email }); 
  }
};

module.exports = User;
