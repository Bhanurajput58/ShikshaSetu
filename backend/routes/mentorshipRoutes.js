import express from 'express';
import {
  createMentorshipRequest,
  getMyMentorshipRequest,
  updateMyMentorshipRequest,
  deleteMyMentorshipRequest,
  getAllMentorshipRequests,
  updateMentorshipRequestStatus,
  cancelMentorship
} from '../controllers/mentorshipController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Removed educator mentorship requests route as getMentorshipRequests no longer exists

// Sirf student mentorship request create kar sakta hai
router.post(
  '/',
  protect,
  authorizeRoles('student'),
  createMentorshipRequest
);

// Student can fetch their own mentorship request
router.get(
  '/my-request',
  protect,
  authorizeRoles('student'),
  getMyMentorshipRequest
);

// Student can update their mentorship request
router.patch(
  '/my-request',
  protect,
  authorizeRoles('student'),
  updateMyMentorshipRequest
);

// Student can cancel (delete) their mentorship request
router.delete(
  '/my-request',
  protect,
  authorizeRoles('student'),
  deleteMyMentorshipRequest
);

// Educator can fetch all mentorship requests
router.get(
  '/all-requests',
  protect,
  authorizeRoles('educator'),
  getAllMentorshipRequests
);

// Educator can update mentorship request status
router.patch(
  '/:id',
  protect,
  authorizeRoles('educator'),
  updateMentorshipRequestStatus
);

// Educator can cancel mentorship with reason
router.patch(
  '/:id/cancel',
  protect,
  authorizeRoles('educator'),
  cancelMentorship
);

export default router;
