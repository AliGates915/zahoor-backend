// routes/admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const User = require('../models/User');

dotenv.config();
const router = express.Router();

// Route for creating an admin
router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findAdmin();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Create new admin
    await Admin.createAdmin(email, password);
    return res.status(201).json({ status: true, message: 'Admin created successfully.' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error creating admin', error: error.message });
  }
});

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findAdmin();
    if (!admin) {
      return res.status(401).json({ message: 'No admin found' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: admin.email }, process.env.KEYS, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ status: true, message: 'Admin login successful' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error logging in', error: error.message });
  }
});

// Approve user
router.post('/approve', async (req, res) => {
  const { email } = req.body;
  
  try {
    await User.approveUser(email);
    return res.json({ status: true, message: 'User approved successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error approving user', error: error.message });
  }
});

// Reject user
router.post('/reject', async (req, res) => {
  const { email } = req.body;
  
  try {
    await User.rejectUser(email);
    return res.json({ status: true, message: 'User rejected successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error rejecting user', error: error.message });
  }
});

// Middleware to verify admin using JWT
const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  try {
    await jwt.verify(token, process.env.KEYS);
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: 'Invalid token', error: error.message });
  }
};

// Route to verify admin authorization
router.get('/verifyAdmin', verifyAdmin, (req, res) => {
  return res.json({ status: true, message: 'Authorized' });
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  return res.json({ status: true, message: 'Admin logged out successfully' });
});

// Export router directly
module.exports = router;
