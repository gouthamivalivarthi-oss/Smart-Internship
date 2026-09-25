import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatCard from '../components/common/StatCard';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { FiPieChart, FiTrendingUp, FiAward, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsApi.getStudent();
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Generating your career analytics..." />;
  }

  const { stats, statusDistribution, monthlyTrends } = data || {};

  // Color palette for Pie Chart
  const COLORS = ['#94A3B8', '#38BDF8', '#F59E0B', '#818CF8', '#10B981', '#EF4444'];

  // Top skills demanded vs user skills mock/comparison
  const skillComparisonData = [
    { skill: 'React', marketDemand: 95, youHave: 100 },
    { skill: 'JavaScript', marketDemand: 90, youHave: 100 },
    { skill: 'TypeScript', marketDemand: 85, youHave: 90 },
    { skill: 'Node.js', marketDemand: 80, youHave: 85 },
    { skill: 'Docker', marketDemand: 70, youHave: 40 },
    { skill: 'AWS / Cloud', marketDemand: 75, youHave: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <FiPieChart className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Career Analytics & Metrics
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Detailed breakdown of your application volume, response rates, and pipeline health
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={stats?.totalApplications || 0}
          icon={FiTrendingUp}
          subtitle="Pipeline volume"
          color="indigo"
        />
        <StatCard
          title="Interview Rate"
          value={`${stats?.interviewRate || 0}%`}
          icon={FiCheckCircle}
          subtitle="Screening pass rate"
          color="purple"
        />
        <StatCard
          title="Offer Rate"
          value={`${stats?.offerRate || 0}%`}
          icon={FiAward}
          subtitle="Final offer conversion"
          color="emerald"
        />
        <StatCard
          title="Avg ATS Score"
          value={`${stats?.avgMatchScore || 85}%`}
          icon={FiPieChart}
          subtitle="Profile match level"
          color="sky"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Donut Chart */}
        <div className="glass-card rounded-2xl p-6 border shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Application Status Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Proportion of applications across lifecycle stages
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {(statusDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Application Trends Area Chart */}
        <div className="glass-card rounded-2xl p-6 border shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Application Velocity (Last 6 Months)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Monthly trajectory of submissions and invitations
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends || []}>
                <defs>
                  <linearGradient id="appliedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="interviewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applied"
                  name="Applications"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#appliedGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  name="Interviews"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#interviewGradient)"
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Demand vs Profile Fit Bar Chart */}
        <div className="glass-card rounded-2xl p-6 border shadow-xs lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Top Skills In-Demand vs Candidate Match
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            How your acquired competencies compare against market demand for modern tech internships
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="skill" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="marketDemand" name="Market Demand %" fill="#818CF8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="youHave" name="Your Profile Match %" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
