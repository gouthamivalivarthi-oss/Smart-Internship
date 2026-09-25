import Application from '../models/Application.js';
import Internship from '../models/Internship.js';
import Notification from '../models/Notification.js';
import { aiService } from '../services/aiService.js';

/**
 * @desc    Get all applications for logged in student
 * @route   GET /api/applications
 * @access  Private (Student)
 */
export const getMyApplications = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const query = { user: req.user._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Application.find(query)
      .populate('internship')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single application by ID
 * @route   GET /api/applications/:id
 * @access  Private
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('internship');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new internship application
 * @route   POST /api/applications
 * @access  Private (Student)
 */
export const createApplication = async (req, res, next) => {
  try {
    const { internshipId, company, role, location, stipend, status, deadline, jobUrl, notes, priority } = req.body;

    let appCompany = company;
    let appRole = role;
    let appLocation = location || 'Remote';
    let appStipend = stipend || '';
    let appDeadline = deadline;
    let appJobUrl = jobUrl || '';
    let aiMatch = null;

    if (internshipId) {
      const internship = await Internship.findById(internshipId);
      if (internship) {
        appCompany = internship.company;
        appRole = internship.title;
        appLocation = internship.location;
        appStipend = internship.stipendDisplay || `${internship.stipend?.currency || '$'}${internship.stipend?.amount || 0}/mo`;
        appDeadline = internship.deadline;
        appJobUrl = internship.applyUrl || '';
        
        // Calculate AI match score
        const matchResult = await aiService.matchResumeToInternship(
          req.user.skills || [],
          internship,
          req.user.resumeParsedText || ''
        );
        aiMatch = {
          score: matchResult.matchScore,
          matchedSkills: matchResult.matchedSkills,
          missingSkills: matchResult.missingSkills,
          summary: matchResult.advice
        };

        // Increment applicants count on internship
        await Internship.findByIdAndUpdate(internshipId, { $inc: { applicantsCount: 1 } });
      }
    }

    if (!appCompany || !appRole) {
      return res.status(400).json({ success: false, message: 'Company and Role are required' });
    }

    const application = await Application.create({
      user: req.user._id,
      internship: internshipId || null,
      company: appCompany,
      role: appRole,
      location: appLocation,
      stipend: appStipend,
      status: status || 'Applied',
      deadline: appDeadline,
      jobUrl: appJobUrl,
      notes: notes || '',
      priority: priority || 'Medium',
      aiMatchScore: aiMatch ? aiMatch.score : null,
      aiFeedback: aiMatch ? {
        matchedSkills: aiMatch.matchedSkills,
        missingSkills: aiMatch.missingSkills,
        summary: aiMatch.summary
      } : undefined
    });

    // Create system notification
    await Notification.create({
      user: req.user._id,
      title: 'Application Added',
      message: `Successfully tracked application for ${appRole} at ${appCompany}.`,
      type: 'application',
      link: '/applications'
    });

    res.status(201).json({
      success: true,
      message: 'Application added to your tracker',
      application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update application status (Kanban drag-and-drop or select)
 * @route   PATCH /api/applications/:id/status
 * @access  Private
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['Wishlist', 'Applied', 'In Review', 'Interviewing', 'Offered', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const oldStatus = application.status;
    application.status = status;
    application.timeline.push({
      status,
      date: new Date(),
      note: note || `Status updated from ${oldStatus} to ${status}`
    });

    await application.save();

    // Alert if offered or interviewing
    if (status === 'Interviewing' || status === 'Offered') {
      await Notification.create({
        user: req.user._id,
        title: `Status Update: ${status}!`,
        message: `Great progress! Your application for ${application.role} at ${application.company} is now marked as ${status}.`,
        type: status === 'Interviewing' ? 'interview' : 'application',
        link: '/applications'
      });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update application details (notes, priority, salary)
 * @route   PUT /api/applications/:id
 * @access  Private
 */
export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Application updated',
      application
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an application
 * @route   DELETE /api/applications/:id
 * @access  Private
 */
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Application removed from tracker'
    });
  } catch (error) {
    next(error);
  }
};
