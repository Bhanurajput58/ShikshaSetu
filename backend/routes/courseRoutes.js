import express from 'express';
import { getCourses, createCourse } from '../controllers/courseController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Course listing and creation
router.get('/', getCourses);
router.post('/', protect, authorizeRoles('educator', 'admin'), createCourse);

export default router;
