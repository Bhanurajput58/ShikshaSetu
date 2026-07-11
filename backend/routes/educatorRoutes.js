import express from 'express';
import { getEducatorProfile, updateEducatorProfile } from '../controllers/educatorController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getMyMentees, getMyScheduledSessions } from '../controllers/mentorshipController.js';

const router = express.Router();

// GET educator profile
router.get('/profile', protect, getEducatorProfile);

// GET educator's mentees
router.get('/my-mentees', protect, getMyMentees);

// GET educator's scheduled sessions
router.get('/my-sessions', protect, getMyScheduledSessions);

// POST update educator profile
router.post('/profile', protect, updateEducatorProfile);

export default router; 