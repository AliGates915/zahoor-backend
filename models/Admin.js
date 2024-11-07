// models/Admin.js
const { getAuthDB } = require('../config/db');
const bcrypt = require('bcrypt');

const db = getAuthDB();

const Admin = {
  findAdmin: async () => {
    return db.collection('admins').findOne({});
  },

  createAdmin: async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return db.collection('admins').insertOne({ email, password: hashPassword });
  },
};

module.exports = Admin;
