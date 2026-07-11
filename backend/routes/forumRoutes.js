import express from 'express';
import { getForumPosts, createForumPost } from '../controllers/forumController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//get Sabhi forum posts 
router.get('/', getForumPosts);

//create Naya post (sirf logged-in users ka)
router.post('/', protect, createForumPost);

export default router;
