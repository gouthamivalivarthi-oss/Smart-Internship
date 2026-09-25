import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyticsApi, applicationApi, interviewApi } from '../services/api';
import StatCard from '../components/common/StatCard';
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
  FiAlertCircle
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
        interviewApi.getAll()
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
    return <LoadingSpinner size="lg" text="Loading dashboard analytics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden bg-gradient-to-r from-indigo-900/90 via-indigo-800/90 to-purple-900/90 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Candidate Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              {stats?.activeApplications || 0} active internship applications in your pipeline.
              Review your upcoming milestones and practice role-tailored questions with AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-md hover:bg-indigo-50 active:scale-95 transition"
            >
              <FiPlus className="w-4 h-4 text-indigo-600" />
              <span>Track Application</span>
            </button>
            <Link
              to="/ai-hub"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 active:scale-95 transition"
            >
              <FiCpu className="w-4 h-4 text-indigo-300" />
              <span>AI Career Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Tracked"
          value={stats?.totalApplications || 0}
          icon={FiBriefcase}
          subtitle="Opportunities saved"
          color="indigo"
        />
        <StatCard
          title="In Review"
          value={stats?.statusCounts?.['In Review'] || 0}
          icon={FiClock}
          subtitle="Recruiter reviewing"
          color="amber"
        />
        <StatCard
          title="Interviews"
          value={stats?.statusCounts?.Interviewing || 0}
          icon={FiCalendar}
          subtitle="Active rounds"
          color="purple"
        />
        <StatCard
          title="Offers Made"
          value={stats?.statusCounts?.Offered || 0}
          icon={FiAward}
          subtitle={`${stats?.offerRate || 0}% offer rate`}
          color="emerald"
        />
        <StatCard
          title="AI Resume Score"
          value={`${stats?.avgMatchScore || user?.resumeScore || 85}%`}
          icon={FiCpu}
          subtitle="ATS benchmark"
          color="sky"
        />
      </div>

      {/* 2-Column Section: Deadlines & Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines Widget */}
        <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <FiClock className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Upcoming Deadlines
              </h3>
            </div>
            <Link
              to="/applications"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {upcomingDeadlines.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No approaching deadlines found. You are ahead of schedule!
              </div>
            ) : (
              upcomingDeadlines.map((app) => (
                <div
                  key={app._id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-3 hover:border-amber-200 dark:hover:border-amber-900/60 transition"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {app.company}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {app.role}
                    </h5>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                      {formatRelativeTime(app.deadline)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {formatDate(app.deadline)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scheduled Interviews Widget */}
        <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <FiCalendar className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Upcoming Interviews
              </h3>
            </div>
            <Link
              to="/interviews"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Manage rounds</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No interviews scheduled yet. Keep applying!
              </div>
            ) : (
              upcomingInterviews.map((item) => (
                <div
                  key={item._id}
                  className="p-3 rounded-xl border border-indigo-100/70 dark:border-indigo-950 bg-indigo-50/20 dark:bg-indigo-950/20 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {item.company}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {item.roundTitle}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {formatDate(item.scheduledDate)} at {new Date(item.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInterviewForAi(item)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs shrink-0 active:scale-95 transition"
                  >
                    AI Prep
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Applications Feed */}
      <div className="glass-card rounded-2xl p-6 border shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Applications
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quickly check status updates and application details
            </p>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span>Open Kanban Board</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {recentApplications.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400">
              No applications tracked yet. Click "Track Application" above to add your first one!
            </div>
          ) : (
            recentApplications.map((app) => (
              <div
                key={app._id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 px-2 rounded-xl transition"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {app.company}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {app.role}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{app.location}</span>
                    {app.stipend && <span className="text-emerald-600 font-semibold">{app.stipend}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {app.aiMatchScore && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
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
      </div>

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
