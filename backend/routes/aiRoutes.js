import express from 'express';
import {
  analyzeResume,
  matchInternship,
  getSkillGap,
  generateQuestions,
  generateCoverLetter,
  getRecommendations
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All AI endpoints require logged-in user context

router.post('/analyze-resume', analyzeResume);
router.post('/match-internship', matchInternship);
router.post('/skill-gap', getSkillGap);
router.post('/interview-questions', generateQuestions);
router.post('/generate-cover-letter', generateCoverLetter);
router.get('/recommendations', getRecommendations);

export default router;
