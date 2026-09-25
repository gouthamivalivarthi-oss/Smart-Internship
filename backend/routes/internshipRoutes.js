import express from 'express';
import {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  getFeaturedInternships
} from '../controllers/internshipController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getAllInternships);
router.get('/featured', getFeaturedInternships);
router.get('/:id', getInternshipById);

// Admin only routes
router.post('/', protect, adminOnly, createInternship);
router.put('/:id', protect, adminOnly, updateInternship);
router.delete('/:id', protect, adminOnly, deleteInternship);

export default router;
