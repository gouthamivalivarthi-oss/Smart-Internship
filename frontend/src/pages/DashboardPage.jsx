import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyticsApi, applicationApi, interviewApi } from '../services/api';
import StatCard from '../components/common/StatCard';
import ThreeCard from '../components/3d/ThreeCard';
import ThreeButton from '../components/3d/ThreeButton';
import ApplicationModal from '../components/applications/ApplicationModal';
import InterviewQuestionsModal from '../components/ai/InterviewQuestionsModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiAward,
  FiCpu,
  FiPlus,
  FiArrowRight,
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
  FiStar,
} from 'react-icons/fi';
import { formatDate, formatRelativeTime, getStatusBadgeStyle } from '../utils/helpers';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInterviewForAi, setSelectedInterviewForAi] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, appsRes, interviewsRes] = await Promise.all([
        analyticsApi.getStudent(),
        applicationApi.getAll({ limit: 5 }),
        interviewApi.getAll(),
      ]);

      if (analyticsRes.data.success) {
        setStats(analyticsRes.data.stats);
        setUpcomingDeadlines(analyticsRes.data.upcomingDeadlines || []);
      }

      if (appsRes.data.success) {
        setRecentApplications(appsRes.data.applications?.slice(0, 5) || []);
      }

      if (interviewsRes.data.success) {
        const scheduled = (interviewsRes.data.interviews || []).filter(
          (i) => i.status === 'Scheduled' && new Date(i.scheduledDate) >= new Date()
        );
        setUpcomingInterviews(scheduled.slice(0, 3));
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateApplication = async (data) => {
    try {
      const res = await applicationApi.create(data);
      if (res.data.success) {
        toast.success('Application tracked successfully!');
        setIsAddModalOpen(false);
        fetchDashboardData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save application');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading warm 3D dashboard metrics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Warm 3D Hero Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-9 border border-[#F5B895]/50 shadow-[0_16px_40px_-8px_rgba(200,92,69,0.28)] overflow-hidden bg-gradient-to-r from-[#E9785B] via-[#C85C45] to-[#8F78C8] text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
              <FiStar className="w-3.5 h-3.5" />
              Candidate 3D Dashboard
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
              You have <strong className="font-extrabold">{stats?.activeApplications || 0} active applications</strong> in your career pipeline.
              Track your upcoming milestones and run targeted AI interview preparations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThreeButton
              variant="secondary"
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-2xl font-bold bg-white text-[#C85C45] hover:bg-[#FFF8ED] shadow-lg"
            >
              <FiPlus className="w-4 h-4 text-[#E9785B] mr-1.5" />
              <span>Track Application</span>
            </ThreeButton>

            <Link to="/ai-hub">
              <ThreeButton
                variant="lavender"
                className="rounded-2xl font-bold shadow-lg"
              >
                <FiCpu className="w-4 h-4 mr-1.5" />
                <span>AI Career Hub</span>
              </ThreeButton>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Dimensional Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Tracked"
          value={stats?.totalApplications || 0}
          icon={FiBriefcase}
          subtitle="Opportunities saved"
          color="coral"
        />
        <StatCard
          title="In Review"
          value={stats?.statusCounts?.['In Review'] || 0}
          icon={FiClock}
          subtitle="Recruiter reviewing"
          color="peach"
        />
        <StatCard
          title="Interviews"
          value={stats?.statusCounts?.Interviewing || 0}
          icon={FiCalendar}
          subtitle="Active rounds"
          color="lavender"
        />
        <StatCard
          title="Offers Made"
          value={stats?.statusCounts?.Offered || 0}
          icon={FiAward}
          subtitle={`${stats?.offerRate || 0}% offer rate`}
          color="sage"
        />
        <StatCard
          title="AI Resume Score"
          value={`${stats?.avgMatchScore || user?.resumeScore || 85}%`}
          icon={FiCpu}
          subtitle="ATS benchmark"
          color="terracotta"
        />
      </div>

      {/* 2-Column Section: Deadlines & Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines Widget */}
        <ThreeCard maxTilt={5} className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F6EBDD] dark:border-[#553B30]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#F5B895]/20 text-[#C85C45] dark:text-[#F5B895]">
                <FiClock className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-[#3D2B24] dark:text-[#FFF8ED]">
                Upcoming Deadlines
              </h3>
            </div>
            <Link
              to="/applications"
              className="text-xs font-bold text-[#C85C45] dark:text-[#F5B895] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {upcomingDeadlines.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 font-medium">
                No approaching deadlines found. You are completely ahead of schedule!
              </div>
            ) : (
              upcomingDeadlines.map((app) => (
                <div
                  key={app._id}
                  className="p-3 rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#3D2B24]/40 flex items-center justify-between gap-3 hover:border-[#F5B895] transition"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
                      {app.company}
                    </span>
                    <h5 className="text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] truncate">
                      {app.role}
                    </h5>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#E9785B] dark:text-[#F5B895] block">
                      {formatRelativeTime(app.deadline)}
                    </span>
                    <span className="text-[10px] text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">
                      {formatDate(app.deadline)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ThreeCard>

        {/* Scheduled Interviews Widget */}
        <ThreeCard maxTilt={5} className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F6EBDD] dark:border-[#553B30]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#B9A7E8]/20 text-[#6C54A7] dark:text-[#B9A7E8]">
                <FiCalendar className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-[#3D2B24] dark:text-[#FFF8ED]">
                Upcoming Interviews
              </h3>
            </div>
            <Link
              to="/interviews"
              className="text-xs font-bold text-[#8F78C8] dark:text-[#B9A7E8] hover:underline flex items-center gap-1"
            >
              <span>Manage rounds</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 font-medium">
                No interviews scheduled yet. Keep applying!
              </div>
            ) : (
              upcomingInterviews.map((item) => (
                <div
                  key={item._id}
                  className="p-3 rounded-xl border border-[#B9A7E8]/30 dark:border-[#553B30] bg-[#B9A7E8]/10 dark:bg-[#3D2B24]/40 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C54A7] dark:text-[#B9A7E8]">
                      {item.company}
                    </span>
                    <h5 className="text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] truncate">
                      {item.roundTitle}
                    </h5>
                    <p className="text-[11px] text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">
                      {formatDate(item.scheduledDate)} at {new Date(item.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInterviewForAi(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white font-bold text-xs shadow-sm shrink-0 active:scale-95 transition"
                  >
                    AI Prep
                  </button>
                </div>
              ))
            )}
          </div>
        </ThreeCard>
      </div>

      {/* Recent Applications Feed */}
      <ThreeCard maxTilt={3} className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#F6EBDD] dark:border-[#553B30]">
          <div>
            <h3 className="font-extrabold text-lg text-[#3D2B24] dark:text-[#FFF8ED]">
              Recent Applications
            </h3>
            <p className="text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium">
              Quickly monitor pipeline movements and AI compatibility scores
            </p>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF8ED] dark:bg-[#3D2B24] text-[#C85C45] dark:text-[#F5B895] font-bold text-xs hover:bg-[#F6EBDD] border border-[#F5B895]/40 transition"
          >
            <span>Open Kanban Board</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#F6EBDD] dark:divide-[#553B30]">
          {recentApplications.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 font-medium">
              No applications tracked yet. Click "Track Application" above to add your first one!
            </div>
          ) : (
            recentApplications.map((app) => (
              <div
                key={app._id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFF8ED]/60 dark:hover:bg-[#3D2B24]/30 px-3 rounded-xl transition"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
                    {app.company}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3D2B24] dark:text-[#FFF8ED]">
                    {app.role}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium mt-0.5">
                    <span>{app.location}</span>
                    {app.stipend && <span className="text-[#5C7D5A] font-bold">{app.stipend}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {app.aiMatchScore && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
                      {app.aiMatchScore}% AI Match
                    </span>
                  )}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadgeStyle(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </ThreeCard>

      {/* Add Application Modal */}
      <ApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateApplication}
      />

      {/* AI Interview Questions Preview Modal */}
      {selectedInterviewForAi && (
        <InterviewQuestionsModal
          isOpen={!!selectedInterviewForAi}
          onClose={() => setSelectedInterviewForAi(null)}
          role={selectedInterviewForAi.role}
          company={selectedInterviewForAi.company}
          skills={user?.skills || []}
        />
      )}
    </div>
  );
};

export default DashboardPage;
