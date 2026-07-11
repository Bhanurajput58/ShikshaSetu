import express from 'express';
import { getStudentProfile, updateStudentProfile, enrollInCourse } from '../controllers/studentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get student profile with enrolled courses and resources
router.get('/profile', protect, authorizeRoles('student'), getStudentProfile);

// Update student profile
router.post('/profile', protect, authorizeRoles('student'), updateStudentProfile);

// Enroll in a course
router.post('/enroll', protect, authorizeRoles('student'), enrollInCourse);

export default router; 