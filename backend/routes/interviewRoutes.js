import express from 'express';
import {
  getMyInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
  addAiQuestions
} from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMyInterviews)
  .post(createInterview);

router.route('/:id')
  .put(updateInterview)
  .delete(deleteInterview);

router.post('/:id/generate-questions', addAiQuestions);

export default router;
