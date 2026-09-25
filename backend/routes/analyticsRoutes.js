import express from 'express';
import { getStudentAnalytics, getAdminAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

router.use(protect);

router.get('/student', getStudentAnalytics);
router.get('/admin', adminOnly, getAdminAnalytics);

export default router;
