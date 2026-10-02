import Internship from '../models/Internship.js';

/**
 * @desc    Get all active internships with search & filtering
 * @route   GET /api/internships
 * @access  Public
 */
export const getAllInternships = async (req, res, next) => {
  try {
    const { keyword, category, type, location, sort, page = 1, limit = 12 } = req.query;

    const query = { active: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { skillsRequired: { $in: [new RegExp(keyword, 'i')] } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'deadline') {
      sortOption = { deadline: 1 };
    } else if (sort === 'stipend') {
      sortOption = { 'stipend.amount': -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: internships.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      internships
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single internship by ID
 * @route   GET /api/internships/:id
 * @access  Public
 */
export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    res.status(200).json({
      success: true,
      internship
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new internship listing
 * @route   POST /api/internships
 * @access  Private (Admin / Recruiter)
 */
export const createInternship = async (req, res, next) => {
  try {
    const internshipData = {
      ...req.body,
      postedBy: req.user._id
    };

    const internship = await Internship.create(internshipData);

    res.status(201).json({
      success: true,
      message: 'Internship posted successfully',
      internship
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an internship
 * @route   PUT /api/internships/:id
 * @access  Private (Admin)
 */
export const updateInternship = async (req, res, next) => {
  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Internship updated successfully',
      internship
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an internship
 * @route   DELETE /api/internships/:id
 * @access  Private (Admin)
 */
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    await internship.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured internships
 * @route   GET /api/internships/featured
 * @access  Public
 */
export const getFeaturedInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({ active: true, featured: true })
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      internships
    });
  } catch (error) {
    next(error);
  }
};
