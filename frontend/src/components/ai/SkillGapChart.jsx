import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { aiApi } from '../../services/api';
import toast from 'react-hot-toast';

const TARGET_ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist / AI Engineer',
  'DevOps Engineer'
];

export const SkillGapChart = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [gapData, setGapData] = useState(null);

  const fetchSkillGap = async (role) => {
    try {
      setLoading(true);
      const res = await aiApi.getSkillGap(role);
      if (res.data.success) {
        setGapData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to analyze skill gap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [selectedRole]);

  return (
    <div className="glass-card rounded-2xl p-6 border shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <FiTrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              AI Skill-Gap & Career Roadmap
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare your current skill set with industry job requirements to prioritize your learning
          </p>
        </div>

        {/* Target Role Selector */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-indigo-600 dark:text-indigo-400 shadow-xs focus:outline-indigo-500"
        >
          {TARGET_ROLES.map((role) => (
            <option key={role} value={role}>
              Target: {role}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
          Generating AI skill-gap assessment...
        </div>
      ) : gapData ? (
        <div className="space-y-6">
          {/* Readiness Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-700 dark:text-slate-200">
                {selectedRole} Readiness
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
                {gapData.readinessScore}% Match
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out"
                style={{ width: `${gapData.readinessScore}%` }}
              ></div>
            </div>
          </div>

          {/* Acquired vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Acquired */}
            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                <FiCheckCircle className="w-4 h-4" />
                <span>Skills You Already Have ({gapData.acquiredSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {gapData.acquiredSkills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-3">
                <FiAlertTriangle className="w-4 h-4" />
                <span>Recommended Skills to Learn ({gapData.missingSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {gapData.missingSkills?.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-medium">You have covered all core requirements!</p>
                ) : (
                  gapData.missingSkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                    >
                      + {skill}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Actionable Learning Roadmap */}
          {gapData.learningRoadmap && gapData.learningRoadmap.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <FiBookOpen className="w-4 h-4 text-indigo-500" />
                Custom Learning Roadmap
              </h4>
              <div className="space-y-2.5">
                {gapData.learningRoadmap.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0 mt-0.5">
                      {item.week}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Master {item.skill}
                        </h5>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SkillGapChart;
