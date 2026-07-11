import express from 'express';
import { getUserProfile, getUserProfileById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route — user khud ka profile dekh sakta hai
router.get('/profile', protect, getUserProfile);
router.get('/:id', getUserProfileById);

export default router;
