import Interview from '../models/Interview.js';
import Application from '../models/Application.js';
import Notification from '../models/Notification.js';
import { aiService } from '../services/aiService.js';

/**
 * @desc    Get all interviews for student
 * @route   GET /api/interviews
 * @access  Private
 */
export const getMyInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .populate('application')
      .sort({ scheduledDate: 1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new interview schedule
 * @route   POST /api/interviews
 * @access  Private
 */
export const createInterview = async (req, res, next) => {
  try {
    const { applicationId, roundTitle, scheduledDate, durationMinutes, locationOrLink, notes, interviewers, autoGenerateAiQuestions } = req.body;

    const application = await Application.findOne({
      _id: applicationId,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    let aiQuestions = [];
    if (autoGenerateAiQuestions !== false) {
      aiQuestions = await aiService.generateInterviewQuestions(
        application.role,
        application.company,
        req.user.skills || []
      );
    }

    const interview = await Interview.create({
      user: req.user._id,
      application: applicationId,
      company: application.company,
      role: application.role,
      roundTitle: roundTitle || 'Technical Round',
      scheduledDate,
      durationMinutes: durationMinutes || 45,
      locationOrLink: locationOrLink || 'Google Meet',
      notes: notes || '',
      interviewers: interviewers || [],
      aiQuestions
    });

    // Update application status to Interviewing if not already
    if (application.status !== 'Interviewing' && application.status !== 'Offered') {
      application.status = 'Interviewing';
      application.timeline.push({
        status: 'Interviewing',
        date: new Date(),
        note: `Interview scheduled: ${roundTitle || 'Technical Round'}`
      });
      await application.save();
    }

    // Schedule notification
    await Notification.create({
      user: req.user._id,
      title: 'Interview Scheduled',
      message: `Interview for ${application.role} at ${application.company} scheduled on ${new Date(scheduledDate).toLocaleDateString()}.`,
      type: 'interview',
      link: '/interviews'
    });

    res.status(201).json({
      success: true,
      message: 'Interview scheduled successfully',
      interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update interview status, notes, or feedback
 * @route   PUT /api/interviews/:id
 * @access  Private
 */
export const updateInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Interview updated',
      interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an interview
 * @route   DELETE /api/interviews/:id
 * @access  Private
 */
export const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Interview deleted'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate AI questions for existing interview
 * @route   POST /api/interviews/:id/generate-questions
 * @access  Private
 */
export const addAiQuestions = async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id });
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    const questions = await aiService.generateInterviewQuestions(
      interview.role,
      interview.company,
      req.user.skills || []
    );

    interview.aiQuestions = questions;
    await interview.save();

    res.status(200).json({
      success: true,
      message: 'AI questions generated and saved',
      aiQuestions: interview.aiQuestions
    });
  } catch (error) {
    next(error);
  }
};
