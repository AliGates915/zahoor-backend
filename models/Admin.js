// models/Admin.js
const { getAuthDB } = require('../config/db');
const bcrypt = require('bcrypt');


const Admin = {
  findAdmin: async () => {
    
  const db = getAuthDB();
    return db.collection('admins').find({}).toArray();
  },

  createAdmin: async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return db.collection('admins').insertOne({ email, password: hashPassword });
  },
};

module.exports = Admin;
