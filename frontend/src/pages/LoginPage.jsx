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
    <div className="max-w-5xl mx-auto my-6 lg:my-10 overflow-hidden rounded-3xl bg-white/95 dark:bg-[#30211B]/95 border border-[#F6EBDD] dark:border-[#553B30] shadow-[0_20px_50px_-10px_rgba(61,43,36,0.18)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left: Authentication Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E9785B] via-[#F5B895] to-[#B9A7E8] text-white text-xl flex items-center justify-center shadow-[0_6px_16px_rgba(200,92,69,0.35)] mb-3">
              🚀
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">
              Sign in to access your 3D internship tracker & AI assistant
            </p>
          </div>

          {/* 1-Click Demo Accounts */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#C85C45] dark:text-[#F5B895]">
              ⚡ 1-Click Instant Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('student@demo.com', 'Password123!')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FFF8ED] hover:bg-[#F6EBDD] dark:bg-[#3D2B24] dark:hover:bg-[#483329] border border-[#F5B895]/50 text-[#C85C45] dark:text-[#F5B895] text-xs font-bold transition shadow-xs active:scale-95 disabled:opacity-50"
              >
                <FiUserCheck className="w-3.5 h-3.5 text-[#E9785B]" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@demo.com', 'Password123!')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F6EBDD] hover:bg-[#EFE0CD] dark:bg-[#3D2B24] dark:hover:bg-[#483329] border border-[#B9A7E8]/50 text-[#6C54A7] dark:text-[#B9A7E8] text-xs font-bold transition shadow-xs active:scale-95 disabled:opacity-50"
              >
                <FiShield className="w-3.5 h-3.5 text-[#8F78C8]" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#F6EBDD] dark:border-[#553B30]"></div>
            <span className="shrink mx-3 text-[10px] text-[#3D2B24]/50 dark:text-[#FFF8ED]/50 uppercase font-bold tracking-wider">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-[#F6EBDD] dark:border-[#553B30]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED]">
                  Password
                </label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                />
              </div>
            </div>

            <ThreeButton
              type="submit"
              disabled={loading}
              loading={loading}
              variant="primary"
              className="w-full py-3 rounded-xl text-xs font-bold shadow-md"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <FiArrowRight className="w-4 h-4 ml-1" />
            </ThreeButton>
          </form>

          <p className="text-center text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#C85C45] dark:text-[#F5B895] hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Right: Three.js Interactive 3D Visual Experience */}
        <div className="hidden lg:block lg:col-span-6 border-l border-[#F6EBDD] dark:border-[#553B30]">
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
