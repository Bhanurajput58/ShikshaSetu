import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Saare courses laao
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('educator', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Naya course banao (Educator only)
router.post('/', async (req, res) => {
  try {
    const { title, description, educator } = req.body;
    const course = new Course({ title, description, educator });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
