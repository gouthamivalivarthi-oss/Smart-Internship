import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InteractiveAuthScene from '../components/3d/InteractiveAuthScene';
import ThreeButton from '../components/3d/ThreeButton';
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result?.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-6 lg:my-10 overflow-hidden rounded-3xl bg-white/95 dark:bg-[#30211B]/95 border border-[#F6EBDD] dark:border-[#553B30] shadow-[0_20px_50px_-10px_rgba(61,43,36,0.18)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left: Registration Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E9785B] via-[#F5B895] to-[#B9A7E8] text-white text-xl flex items-center justify-center shadow-[0_6px_16px_rgba(200,92,69,0.35)] mb-3">
              🚀
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">
              Start tracking internships and unlocking 3D AI career guidance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Johnson"
                  className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@university.edu"
                  className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                  Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 chars"
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85C45] w-4 h-4" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="w-full text-xs rounded-xl border border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/40 dark:bg-[#281B16] pl-10 pr-3 py-2.5 text-[#3D2B24] dark:text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 focus:border-[#E9785B] shadow-inner font-medium transition"
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] mb-1.5">
                I am joining as:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition duration-200 ${
                    formData.role === 'student'
                      ? 'bg-[#E9785B]/15 border-[#E9785B] text-[#C85C45] dark:text-[#F5B895] shadow-xs'
                      : 'border-[#F6EBDD] dark:border-[#553B30] text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 hover:bg-[#FFF8ED] dark:hover:bg-[#38261F]'
                  }`}
                >
                  Student / Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition duration-200 ${
                    formData.role === 'admin'
                      ? 'bg-[#B9A7E8]/25 border-[#8F78C8] text-[#6C54A7] dark:text-[#B9A7E8] shadow-xs'
                      : 'border-[#F6EBDD] dark:border-[#553B30] text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 hover:bg-[#FFF8ED] dark:hover:bg-[#38261F]'
                  }`}
                >
                  Recruiter / Admin
                </button>
              </div>
            </div>

            <ThreeButton
              type="submit"
              disabled={loading}
              loading={loading}
              variant="primary"
              className="w-full py-3 rounded-xl text-xs font-bold shadow-md mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <FiArrowRight className="w-4 h-4 ml-1" />
            </ThreeButton>
          </form>

          <p className="text-center text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#C85C45] dark:text-[#F5B895] hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right: Three.js Interactive 3D Visual Experience */}
        <div className="hidden lg:block lg:col-span-6 border-l border-[#F6EBDD] dark:border-[#553B30]">
          <InteractiveAuthScene
            title="Launch Your Tech Career Today"
            subtitle="Get AI-powered resume scoring, skill roadmaps, and instant interview simulations in full 3D."
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
