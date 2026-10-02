import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatCard from '../components/common/StatCard';
import ThreeCard from '../components/3d/ThreeCard';
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
    return <LoadingSpinner size="lg" text="Generating your 3D career analytics..." />;
  }

  const { stats, statusDistribution, monthlyTrends } = data || {};

  // Warm Palette for Charts (Coral, Peach, Lavender, Purple, Sage, Terracotta)
  const WARM_COLORS = ['#E9785B', '#F5B895', '#B9A7E8', '#8F78C8', '#9DB79B', '#C85C45'];

  const skillComparisonData = [
    { skill: 'React', marketDemand: 95, youHave: 100 },
    { skill: 'JavaScript', marketDemand: 90, youHave: 100 },
    { skill: 'TypeScript', marketDemand: 85, youHave: 90 },
    { skill: 'Node.js', marketDemand: 80, youHave: 85 },
    { skill: 'Docker', marketDemand: 70, youHave: 40 },
    { skill: 'AWS / Cloud', marketDemand: 75, youHave: 30 },
  ];

  const customTooltipStyle = {
    backgroundColor: 'rgba(61, 43, 36, 0.95)',
    borderRadius: '16px',
    border: '1px solid rgba(245, 184, 149, 0.4)',
    color: '#FFF8ED',
    fontSize: '12px',
    boxShadow: '0 10px 30px rgba(61, 43, 36, 0.25)',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
            <FiPieChart className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
            Career Analytics & Metrics
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium mt-1">
          Detailed breakdown of your application volume, response rates, and pipeline health with 3D charts
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={stats?.totalApplications || 0}
          icon={FiTrendingUp}
          subtitle="Pipeline volume"
          color="coral"
        />
        <StatCard
          title="Interview Rate"
          value={`${stats?.interviewRate || 0}%`}
          icon={FiCheckCircle}
          subtitle="Screening pass rate"
          color="lavender"
        />
        <StatCard
          title="Offer Rate"
          value={`${stats?.offerRate || 0}%`}
          icon={FiAward}
          subtitle="Final offer conversion"
          color="sage"
        />
        <StatCard
          title="Avg ATS Score"
          value={`${stats?.avgMatchScore || 85}%`}
          icon={FiPieChart}
          subtitle="Profile match level"
          color="peach"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Donut Chart */}
        <ThreeCard maxTilt={4} className="p-6">
          <h3 className="text-base font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
            Application Status Distribution
          </h3>
          <p className="text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium mb-4">
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
                  paddingAngle={5}
                  dataKey="count"
                >
                  {(statusDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={WARM_COLORS[index % WARM_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#3D2B24' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ThreeCard>

        {/* Monthly Application Trends Area Chart */}
        <ThreeCard maxTilt={4} className="p-6">
          <h3 className="text-base font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
            Application Velocity (Last 6 Months)
          </h3>
          <p className="text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium mb-4">
            Monthly trajectory of submissions and invitations
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends || []}>
                <defs>
                  <linearGradient id="coralGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9785B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E9785B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="lavenderGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B9A7E8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B9A7E8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F6EBDD" opacity={0.6} />
                <XAxis dataKey="month" stroke="#C85C45" fontSize={11} />
                <YAxis stroke="#C85C45" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="applied"
                  name="Applications"
                  stroke="#E9785B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#coralGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  name="Interviews"
                  stroke="#8F78C8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#lavenderGradient)"
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ThreeCard>

        {/* Skill Demand vs Profile Fit Bar Chart */}
        <ThreeCard maxTilt={3} className="p-6 lg:col-span-2">
          <h3 className="text-base font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
            Top Skills In-Demand vs Candidate Match
          </h3>
          <p className="text-xs text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-medium mb-4">
            How your acquired competencies compare against market demand for modern tech internships
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F6EBDD" opacity={0.6} />
                <XAxis dataKey="skill" stroke="#C85C45" fontSize={12} />
                <YAxis stroke="#C85C45" fontSize={12} unit="%" />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="marketDemand" name="Market Demand %" fill="#B9A7E8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="youHave" name="Your Profile Match %" fill="#E9785B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ThreeCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
