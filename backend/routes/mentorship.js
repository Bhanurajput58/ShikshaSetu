import express from 'express';
import MentorshipRequest from '../models/MentorshipRequest.js';

const router = express.Router();

// Ek educator ke saare mentorship requests lana hai
router.get('/educator/:educatorId', async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ educator: req.params.educatorId })
      .populate('student', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Naya mentorship request create karna hai (student dwara)
router.post('/', async (req, res) => {
  try {
    const { student, educator, message } = req.body;
    const request = new MentorshipRequest({ student, educator, message });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
