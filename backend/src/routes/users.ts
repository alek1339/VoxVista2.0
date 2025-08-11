import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../models/User'; // Adjust the path as needed

const router = express.Router();

// GET all users (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create new user (registration)
router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, firstName, lastName, nativeLanguage } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ email, password, firstName, lastName, nativeLanguage });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, email, firstName, lastName } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


// POST login (simplified)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password (assuming you hash passwords)
    // For now, just plain text comparison (not secure in production!)
    if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token here (not implemented)
    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
