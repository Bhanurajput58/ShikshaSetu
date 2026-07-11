import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// New user registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed, role });

    await newUser.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error, try again later' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server issue. Please retry.' });
  }
});

export default router;
