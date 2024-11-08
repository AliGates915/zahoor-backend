// models/Admin.js
const bcrypt = require('bcrypt');


const Admin = {

  createAdmin: async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return db.collection('admins').insertOne({ email, password: hashPassword });
  },
};

module.exports = Admin;
