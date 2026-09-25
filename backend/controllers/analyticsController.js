import Application from '../models/Application.js';
import Internship from '../models/Internship.js';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

/**
 * @desc    Get comprehensive student dashboard analytics
 * @route   GET /api/analytics/student
 * @access  Private (Student)
 */
export const getStudentAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch all user applications
    const applications = await Application.find({ user: userId });

    // Status counts
    const statusCounts = {
      Wishlist: 0,
      Applied: 0,
      'In Review': 0,
      Interviewing: 0,
      Offered: 0,
      Rejected: 0
    };

    let totalMatchScore = 0;
    let matchScoreCount = 0;

    applications.forEach(app => {
      if (statusCounts[app.status] !== undefined) {
        statusCounts[app.status]++;
      }
      if (typeof app.aiMatchScore === 'number' && app.aiMatchScore > 0) {
        totalMatchScore += app.aiMatchScore;
        matchScoreCount++;
      }
    });

    const totalApplications = applications.length;
    const activeApplications = applications.filter(a => !['Offered', 'Rejected'].includes(a.status)).length;
    const offerRate = totalApplications > 0 ? Math.round((statusCounts.Offered / totalApplications) * 100) : 0;
    const interviewRate = totalApplications > 0 ? Math.round(((statusCounts.Interviewing + statusCounts.Offered) / totalApplications) * 100) : 0;
    const avgMatchScore = matchScoreCount > 0 ? Math.round(totalMatchScore / matchScoreCount) : (req.user.resumeScore || 75);

    // Monthly trends (last 6 months)
    const monthlyTrendsMap = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString('en-US', { month: 'short' });
      monthlyTrendsMap[key] = { month: key, applied: 0, interviews: 0, offers: 0 };
    }

    applications.forEach(app => {
      const appDate = new Date(app.appliedDate || app.createdAt);
      const key = appDate.toLocaleString('en-US', { month: 'short' });
      if (monthlyTrendsMap[key]) {
        monthlyTrendsMap[key].applied++;
        if (app.status === 'Interviewing') monthlyTrendsMap[key].interviews++;
        if (app.status === 'Offered') monthlyTrendsMap[key].offers++;
      }
    });

    const monthlyTrends = Object.values(monthlyTrendsMap);

    // Upcoming Deadlines (within next 30 days)
    const upcomingDeadlines = await Application.find({
      user: userId,
      deadline: { $gte: new Date() },
      status: { $in: ['Wishlist', 'Applied'] }
    })
      .sort({ deadline: 1 })
      .limit(5);

    // Upcoming Interviews
    const upcomingInterviews = await Interview.find({
      user: userId,
      scheduledDate: { $gte: new Date() },
      status: 'Scheduled'
    })
      .sort({ scheduledDate: 1 })
      .limit(5);

    // Format status distribution for Recharts
    const statusDistribution = [
      { name: 'Wishlist', count: statusCounts.Wishlist, color: '#94A3B8' },
      { name: 'Applied', count: statusCounts.Applied, color: '#38BDF8' },
      { name: 'In Review', count: statusCounts['In Review'], color: '#F59E0B' },
      { name: 'Interviewing', count: statusCounts.Interviewing, color: '#818CF8' },
      { name: 'Offered', count: statusCounts.Offered, color: '#10B981' },
      { name: 'Rejected', count: statusCounts.Rejected, color: '#EF4444' }
    ];

    res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        activeApplications,
        statusCounts,
        offerRate,
        interviewRate,
        avgMatchScore
      },
      statusDistribution,
      monthlyTrends,
      upcomingDeadlines,
      upcomingInterviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin platform analytics
 * @route   GET /api/analytics/admin
 * @access  Private (Admin)
 */
export const getAdminAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInternships = await Internship.countDocuments();
    const activeInternships = await Internship.countDocuments({ active: true });
    const totalApplications = await Application.countDocuments();

    const topCategories = await Internship.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const statusBreakdown = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentApplications = await Application.find()
      .populate('user', 'name email')
      .populate('internship', 'title company')
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalInternships,
        activeInternships,
        totalApplications,
        topCategories,
        statusBreakdown,
        recentApplications
      }
    });
  } catch (error) {
    next(error);
  }
};
