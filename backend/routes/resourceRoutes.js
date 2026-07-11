import express from 'express';
import multer from 'multer';
import { uploadResource, getResources, getResourceById, downloadResource } from '../controllers/resourceController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC/DOCX files are allowed!'));
    }
  }
});

// Upload resource (educator only)
router.post('/upload', protect, authorizeRoles('educator'), upload.single('file'), uploadResource);

// Get all resources (public)
router.get('/', getResources);

// Get resource by id (increments view count)
router.get('/:id', getResourceById);
// Download resource file (increments download count)
router.get('/:id/download', downloadResource);

export default router; 