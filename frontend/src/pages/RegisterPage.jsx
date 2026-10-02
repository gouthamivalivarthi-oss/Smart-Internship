import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InteractiveAuthScene from '../components/3d/InteractiveAuthScene';
import ThreeButton from '../components/3d/ThreeButton';
import { FiUser, FiMail, FiLock, FiArrowRight, FiShield } from 'react-icons/fi';
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
    <div className="max-w-5xl mx-auto my-6 lg:my-10 overflow-hidden rounded-3xl bg-[#FFFDF7] dark:bg-[#292722] border border-[#E9E0D2] dark:border-[#423E37] shadow-3d">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left: Registration Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C96B4B] via-[#E28A45] to-[#D6A85F] text-white text-xl flex items-center justify-center shadow-3d-copper mb-3">
              🚀
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292722] dark:text-[#FFFDF7] tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-[#292722]/70 dark:text-[#F7F3EA]/70 font-medium">
              Start tracking internships and unlocking 3D AI career guidance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Gouthami Valivarthi"
                  className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="gouthamivalivarthi@gmail.com"
                  className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1">
                  Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 chars"
                    className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B87333] w-4 h-4 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="w-full text-xs rounded-xl border border-[#B8B0A3]/50 dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#1A1815] pl-10 pr-3 py-2.5 text-[#292722] dark:text-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#B87333]/30 focus:border-[#B87333] shadow-inner font-medium transition"
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-[#292722] dark:text-[#FFFDF7] mb-1.5">
                I am joining as:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition duration-200 ${
                    formData.role === 'student'
                      ? 'bg-[#B87333]/15 border-[#B87333] text-[#B87333] dark:text-[#D6A85F] shadow-sm'
                      : 'border-[#E9E0D2] dark:border-[#423E37] text-[#292722]/70 dark:text-[#F7F3EA]/70 hover:bg-[#F7F3EA] dark:hover:bg-[#35312B]'
                  }`}
                >
                  Student / Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition duration-200 ${
                    formData.role === 'admin'
                      ? 'bg-[#D6A85F]/25 border-[#D6A85F] text-[#B87333] dark:text-[#D6A85F] shadow-sm'
                      : 'border-[#E9E0D2] dark:border-[#423E37] text-[#292722]/70 dark:text-[#F7F3EA]/70 hover:bg-[#F7F3EA] dark:hover:bg-[#35312B]'
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
              className="w-full py-3 rounded-xl text-xs font-bold shadow-3d-copper mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <FiArrowRight className="w-4 h-4 ml-1" />
            </ThreeButton>
          </form>

          <p className="text-center text-xs text-[#292722]/70 dark:text-[#F7F3EA]/70 font-medium">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#B87333] dark:text-[#D6A85F] hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right: Three.js Interactive 3D Visual Experience */}
        <div className="hidden lg:block lg:col-span-6 border-l border-[#E9E0D2] dark:border-[#423E37]">
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
