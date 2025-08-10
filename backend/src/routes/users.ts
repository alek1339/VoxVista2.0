import express from 'express';
import mongoose from 'mongoose';
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
  const { email, password, firstName, lastName, nativeLanguage, learningLanguage } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({
      email,
      password, // You should hash the password before saving
      firstName,
      lastName,
      nativeLanguage,
      learningLanguage,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
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
