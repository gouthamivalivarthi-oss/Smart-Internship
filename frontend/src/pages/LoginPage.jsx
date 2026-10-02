import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InteractiveAuthScene from '../components/3d/InteractiveAuthScene';
import ThreeButton from '../components/3d/ThreeButton';
import { FiMail, FiLock, FiArrowRight, FiUserCheck, FiShield } from 'react-icons/fi';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result?.success) {
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    const result = await login(demoEmail, demoPassword);
    setLoading(false);
    if (result?.success) {
      navigate(result.user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-6 lg:my-10 overflow-hidden rounded-3xl bg-[#FFFDF7] dark:bg-[#292722] border border-[#E9E0D2] dark:border-[#423E37] shadow-3d">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left: Authentication Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C96B4B] via-[#E28A45] to-[#D6A85F] text-white text-xl flex items-center justify-center shadow-3d-copper mb-3">
              🚀
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292722] dark:text-[#FFFDF7] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-[#292722]/70 dark:text-[#F7F3EA]/70 font-medium">
              Sign in to access your 3D internship tracker & AI assistant
            </p>
          </div>

          {/* 1-Click Demo Accounts */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#B87333] dark:text-[#D6A85F]">
              ⚡ 1-Click Instant Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('student@demo.com', 'Password123!')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F7F3EA] hover:bg-[#E9E0D2] dark:bg-[#35312B] dark:hover:bg-[#423E37] border border-[#D6A85F]/50 text-[#B87333] dark:text-[#D6A85F] text-xs font-bold transition shadow-xs active:scale-95 disabled:opacity-50"
              >
                <FiUserCheck className="w-3.5 h-3.5 text-[#B87333]" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@demo.com', 'Password123!')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F7F3EA] hover:bg-[#E9E0D2] dark:bg-[#35312B] dark:hover:bg-[#423E37] border border-[#B8B0A3]/50 text-[#292722] dark:text-[#FFFDF7] text-xs font-bold transition shadow-xs active:scale-95 disabled:opacity-50"
              >
                <FiShield className="w-3.5 h-3.5 text-[#7E9278]" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E9E0D2] dark:border-[#423E37]"></div>
            <span className="shrink mx-3 text-[10px] text-[#292722]/50 dark:text-[#F7F3EA]/50 uppercase font-bold tracking-wider">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-[#E9E0D2] dark:border-[#423E37]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gouthamivalivarthi@gmail.com"
                  className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#292722] dark:text-[#FFFDF7]">
                  Password
                </label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                />
              </div>
            </div>

            <ThreeButton
              type="submit"
              disabled={loading}
              loading={loading}
              variant="primary"
              className="w-full py-3 rounded-xl text-xs font-bold shadow-3d-copper"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <FiArrowRight className="w-4 h-4 ml-1" />
            </ThreeButton>
          </form>

          <p className="text-center text-xs text-[#292722]/70 dark:text-[#F7F3EA]/70 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#B87333] dark:text-[#D6A85F] hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Right: Three.js Interactive 3D Visual Experience */}
        <div className="hidden lg:block lg:col-span-6 border-l border-[#E9E0D2] dark:border-[#423E37]">
          <InteractiveAuthScene
            title="Accelerate Your Internship Search"
            subtitle="Unlock semantic ATS matching, interactive Kanban tracking, and 3D AI interview simulations."
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
