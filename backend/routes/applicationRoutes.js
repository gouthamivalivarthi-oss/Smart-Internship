import express from 'express';
import {
  getMyApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  updateApplication,
  deleteApplication
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All application routes require authentication

router.route('/')
  .get(getMyApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

router.patch('/:id/status', updateApplicationStatus);

export default router;
