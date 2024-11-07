const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcrypt');

dotenv.config();

const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
  const { username, profession, phoneNumber, email, address, city, password } = req.body;

  // Check if user already exists
  const user = await User.findByEmail(email);
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  await User.createUser(username, profession, phoneNumber, email, address, city, password);
  return res.json({ status: true, message: 'User registered. Please wait for admin approval.' });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'User not registered' });
  }

  if (!user.isApproved) {
    return res.status(403).json({ message: 'Your account is not approved by the admin' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: 'Login successful' });
});


const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.json({ status: false, message: 'No token' });
    }

    await jwt.verify(token, process.env.KEY);
    next();
  } catch (error) {
    return res.json({ message: 'Invalid token' });
  }
};

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: 'Authorized' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true, message: 'Logged out successfully' });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ status: true, users });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: 'Error fetching users' });
  }
});

module.exports = { UserRouter: router };




