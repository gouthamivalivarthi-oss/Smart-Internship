import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { parseResumeFile, analyzeResumeText } from '../utils/resumeExtractor.js';
import path from 'path';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_smart_internship_tracker_2026', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, fullName, email, password, confirmPassword, role } = req.body;
    const resolvedName = name || fullName;

    if (!resolvedName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: resolvedName,
      email: email.toLowerCase(),
      password,
      role: role === 'admin' ? 'admin' : 'student',
      skills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
      targetRoles: ['Frontend Developer', 'Software Engineer']
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        headline: user.headline,
        targetRoles: user.targetRoles,
        resumeScore: user.resumeScore
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        headline: user.headline,
        bio: user.bio,
        location: user.location,
        university: user.university,
        targetRoles: user.targetRoles,
        resumeUrl: user.resumeUrl,
        resumeFileName: user.resumeFileName,
        resumeScore: user.resumeScore,
        socialLinks: user.socialLinks
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      headline: req.body.headline,
      bio: req.body.bio,
      location: req.body.location,
      university: req.body.university,
      graduationYear: req.body.graduationYear,
      skills: req.body.skills,
      targetRoles: req.body.targetRoles,
      socialLinks: req.body.socialLinks
    };

    // Strip undefined keys
    Object.keys(fieldsToUpdate).forEach(
      key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload & Parse Resume
 * @route   POST /api/auth/upload-resume
 * @access  Private
 */
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file (PDF, DOCX, TXT)' });
    }

    const filePath = req.file.path;
    const parsedData = await parseResumeFile(filePath);

    // Merge extracted skills with existing user skills without duplicates
    const user = await User.findById(req.user._id);
    const existingSkills = new Set(user.skills || []);
    parsedData.extractedSkills.forEach(skill => existingSkills.add(skill));

    user.resumeUrl = `/uploads/${path.basename(filePath)}`;
    user.resumeFileName = req.file.originalname;
    user.resumeParsedText = parsedData.rawText;
    user.resumeSkills = parsedData.extractedSkills;
    user.resumeScore = parsedData.score;
    user.skills = Array.from(existingSkills);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded and analyzed successfully',
      resume: {
        fileName: user.resumeFileName,
        url: user.resumeUrl,
        score: user.resumeScore,
        extractedSkills: parsedData.extractedSkills,
        sections: parsedData.sections
      },
      updatedUser: user
    });
  } catch (error) {
    next(error);
  }
};
