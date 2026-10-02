import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NotificationDropdown from '../notifications/NotificationDropdown';
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiBriefcase,
  FiLayers,
  FiCpu,
  FiCalendar,
  FiPieChart,
  FiStar,
} from 'react-icons/fi';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FiLayers },
    { name: 'Internships', path: '/internships', icon: FiBriefcase },
    { name: 'Tracker', path: '/applications', icon: FiLayers },
    { name: 'AI Career Hub', path: '/ai-hub', icon: FiCpu, badge: 'AI' },
    { name: 'Interviews', path: '/interviews', icon: FiCalendar },
    { name: 'Analytics', path: '/analytics', icon: FiPieChart },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: FiShield });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF8ED]/90 dark:bg-[#281B16]/90 backdrop-blur-md border-b border-[#F6EBDD] dark:border-[#553B30] shadow-[0_4px_20px_-4px_rgba(61,43,36,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Warm Sunset Gradient & 3D Depth */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E9785B] via-[#F5B895] to-[#B9A7E8] flex items-center justify-center text-white shadow-[0_6px_16px_rgba(233,120,91,0.35)] group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(200,92,69,0.45)] transition-all duration-200">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[#3D2B24] dark:text-[#FFF8ED]">
                  Smart<span className="gradient-text-coral">Tracker</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30">
                  3D AI
                </span>
              </div>
              <p className="text-[10px] text-[#3D2B24]/60 dark:text-[#FFF8ED]/60 font-semibold -mt-1 hidden sm:block">
                Internship Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Rounded Pill Container */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1 bg-[#F6EBDD]/60 dark:bg-[#35231C]/60 p-1.5 rounded-2xl border border-[#F5B895]/20 shadow-inner">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-[0_4px_14px_rgba(200,92,69,0.38)] scale-[1.02]'
                        : 'text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 hover:text-[#E9785B] hover:bg-white/80 dark:hover:bg-[#452E25]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                    {link.badge && !active && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#B9A7E8]/30 text-[#8F78C8] dark:text-[#B9A7E8] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#F6EBDD] dark:hover:bg-[#3D2B24] border border-[#F6EBDD] dark:border-[#553B30] transition duration-200"
              title={isDark ? 'Switch to Warm Cream Mode' : 'Switch to Warm Dark Mode'}
            >
              {isDark ? <FiSun className="w-4 h-4 text-[#F5B895]" /> : <FiMoon className="w-4 h-4 text-[#C85C45]" />}
            </button>

            {isAuthenticated ? (
              <>
                <NotificationDropdown />

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-2xl bg-white/80 dark:bg-[#38261F] hover:bg-[#FFF8ED] border border-[#F5B895]/40 shadow-sm transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E9785B] via-[#C85C45] to-[#8F78C8] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] hidden lg:inline max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#30211B] rounded-2xl shadow-[0_16px_40px_-10px_rgba(61,43,36,0.2)] border border-[#F6EBDD] dark:border-[#553B30] z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-[#F6EBDD] dark:border-[#553B30]">
                        <p className="text-xs font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] truncate">{user?.name}</p>
                        <p className="text-[11px] text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895]">
                          {user?.role}
                        </span>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#FFF8ED] dark:hover:bg-[#452E25]"
                      >
                        <FiUser className="w-4 h-4 text-[#C85C45]" />
                        <span>My Profile & Resume</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#FFF8ED] dark:hover:bg-[#452E25]"
                        >
                          <FiShield className="w-4 h-4 text-[#8F78C8]" />
                          <span>Admin Control Center</span>
                        </Link>
                      )}

                      <div className="border-t border-[#F6EBDD] dark:border-[#553B30] my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#C85C45] hover:bg-[#FDECE4] dark:hover:bg-[#452E25]"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-[#3D2B24] dark:text-[#FFF8ED] hover:text-[#E9785B] transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-[0_4px_14px_rgba(200,92,69,0.35)] hover:shadow-[0_6px_20px_rgba(200,92,69,0.5)] active:scale-95 transition"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#F6EBDD] dark:hover:bg-[#3D2B24] rounded-xl"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="md:hidden border-t border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/95 dark:bg-[#281B16]/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  active
                    ? 'bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-sm'
                    : 'text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#F6EBDD] dark:hover:bg-[#35231C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B9A7E8]/30 text-[#8F78C8] dark:text-[#B9A7E8]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
