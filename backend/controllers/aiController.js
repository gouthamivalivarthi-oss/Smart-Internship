import { aiService } from '../services/aiService.js';
import Internship from '../models/Internship.js';
import User from '../models/User.js';

/**
 * @desc    Analyze student's resume
 * @route   POST /api/ai/analyze-resume
 * @access  Private
 */
export const analyzeResume = async (req, res, next) => {
  try {
    const { resumeText } = req.body;
    const textToAnalyze = resumeText || req.user.resumeParsedText || '';
    const skills = req.user.skills || [];

    if (!textToAnalyze && skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No resume text or skills found. Please upload a resume or provide text.'
      });
    }

    const analysis = await aiService.analyzeResume(textToAnalyze, skills);

    // Update user's score if available
    if (analysis.score) {
      await User.findByIdAndUpdate(req.user._id, { resumeScore: analysis.score });
    }

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Match student profile to a specific internship
 * @route   POST /api/ai/match-internship
 * @access  Private
 */
export const matchInternship = async (req, res, next) => {
  try {
    const { internshipId, customInternship } = req.body;

    let internship = customInternship;
    if (internshipId) {
      internship = await Internship.findById(internshipId);
    }

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    const userSkills = req.user.skills || [];
    const resumeText = req.user.resumeParsedText || '';

    const matchResult = await aiService.matchResumeToInternship(userSkills, internship, resumeText);

    res.status(200).json({
      success: true,
      match: matchResult
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Skill-gap analysis for target role
 * @route   POST /api/ai/skill-gap
 * @access  Private
 */
export const getSkillGap = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    const role = targetRole || (req.user.targetRoles && req.user.targetRoles[0]) || 'Full Stack Developer';
    const userSkills = req.user.skills || [];

    const result = await aiService.analyzeSkillGap(userSkills, role);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate AI interview questions
 * @route   POST /api/ai/interview-questions
 * @access  Private
 */
export const generateQuestions = async (req, res, next) => {
  try {
    const { role, company, skills } = req.body;

    const targetRole = role || 'Software Engineering Intern';
    const targetCompany = company || 'Tech Corporation';
    const targetSkills = skills && skills.length > 0 ? skills : (req.user.skills || ['JavaScript', 'React']);

    const questions = await aiService.generateInterviewQuestions(targetRole, targetCompany, targetSkills);

    res.status(200).json({
      success: true,
      questions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate tailored cover letter
 * @route   POST /api/ai/generate-cover-letter
 * @access  Private
 */
export const generateCoverLetter = async (req, res, next) => {
  try {
    const { internshipId, internshipDetails } = req.body;

    let internship = internshipDetails;
    if (internshipId) {
      internship = await Internship.findById(internshipId);
    }

    if (!internship) {
      return res.status(400).json({ success: false, message: 'Internship details required' });
    }

    const coverLetter = await aiService.generateCoverLetter(
      req.user.name,
      req.user.skills || ['JavaScript', 'React'],
      internship
    );

    res.status(200).json({
      success: true,
      coverLetter
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get AI recommendations of internships based on student skills
 * @route   GET /api/ai/recommendations
 * @access  Private
 */
export const getRecommendations = async (req, res, next) => {
  try {
    const userSkills = (req.user.skills || []).map(s => s.toLowerCase());

    const activeInternships = await Internship.find({ active: true }).limit(30);

    // Score each internship
    const scored = activeInternships.map(internship => {
      const reqSkills = internship.skillsRequired || [];
      let matchCount = 0;

      reqSkills.forEach(skill => {
        if (userSkills.some(u => u.includes(skill.toLowerCase()) || skill.toLowerCase().includes(u))) {
          matchCount++;
        }
      });

      const score = reqSkills.length > 0 ? Math.round((matchCount / reqSkills.length) * 100) : 70;
      return {
        internship,
        score,
        matchCount,
        totalRequired: reqSkills.length
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    res.status(200).json({
      success: true,
      recommendations: scored.slice(0, 8)
    });
  } catch (error) {
    next(error);
  }
};
