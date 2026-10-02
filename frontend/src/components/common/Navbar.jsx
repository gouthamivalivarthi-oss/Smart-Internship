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
  FiShield,
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
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF7]/92 dark:bg-[#292722]/92 backdrop-blur-md border-b border-[#E9E0D2] dark:border-[#423E37] shadow-[0_4px_20px_-4px_rgba(41,39,34,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Warm Copper Gradient & 3D Depth */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C96B4B] via-[#E28A45] to-[#D6A85F] flex items-center justify-center text-white shadow-3d-copper group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(184,115,51,0.45)] transition-all duration-200">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[#292722] dark:text-[#FFFDF7]">
                  Smart<span className="gradient-text-copper">Tracker</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#B87333]/15 text-[#B87333] dark:text-[#D6A85F] border border-[#B87333]/30">
                  ThreeUI 3D
                </span>
              </div>
              <p className="text-[10px] text-[#292722]/60 dark:text-[#F7F3EA]/60 font-semibold -mt-1 hidden sm:block">
                Internship Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Rounded Pill Container */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1 bg-[#F7F3EA] dark:bg-[#35312B] p-1.5 rounded-2xl border border-[#E9E0D2] dark:border-[#423E37] shadow-inner">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-[#C96B4B] via-[#E28A45] to-[#D6A85F] text-white shadow-3d-copper scale-[1.02]'
                        : 'text-[#292722]/80 dark:text-[#FFFDF7]/80 hover:text-[#B87333] hover:bg-white/90 dark:hover:bg-[#423E37]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                    {link.badge && !active && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#D6A85F]/30 text-[#B87333] dark:text-[#D6A85F] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-[#292722]/70 dark:text-[#FFFDF7]/80 hover:text-[#292722] hover:bg-[#F7F3EA] dark:hover:bg-[#35312B] border border-transparent hover:border-[#E9E0D2] dark:hover:border-[#423E37] transition active:scale-95"
              title={isDark ? 'Switch to Light Warm Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <FiSun className="w-4 h-4 text-[#D6A85F]" /> : <FiMoon className="w-4 h-4 text-[#B87333]" />}
            </button>

            {/* Notifications Dropdown (If Logged In) */}
            {isAuthenticated && <NotificationDropdown />}

            {/* User Profile Dropdown or Auth CTAs */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-2xl border border-[#E9E0D2] dark:border-[#423E37] bg-[#FFFDF7] dark:bg-[#35312B] hover:shadow-3d-sm transition"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#C96B4B] to-[#D6A85F] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#292722] dark:text-[#FFFDF7] hidden sm:block max-w-[100px] truncate">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#FFFDF7] dark:bg-[#292722] border border-[#E9E0D2] dark:border-[#423E37] shadow-3d p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-[#E9E0D2] dark:border-[#423E37] mb-1">
                      <p className="text-xs font-bold text-[#292722] dark:text-[#FFFDF7] truncate">{user?.name}</p>
                      <p className="text-[11px] text-[#292722]/60 dark:text-[#F7F3EA]/60 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#292722] dark:text-[#FFFDF7] hover:bg-[#F7F3EA] dark:hover:bg-[#35312B] rounded-xl transition"
                    >
                      <FiUser className="w-4 h-4 text-[#B87333]" />
                      <span>My Profile & Skills</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#C96B4B] hover:bg-[#C96B4B]/10 rounded-xl transition mt-1"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-[#292722] dark:text-[#FFFDF7] hover:text-[#B87333] hover:bg-[#F7F3EA] dark:hover:bg-[#35312B] rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#C96B4B] via-[#E28A45] to-[#D6A85F] rounded-xl shadow-3d-copper hover:shadow-[0_8px_22px_rgba(201,107,75,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 transition"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-[#292722] dark:text-[#FFFDF7] hover:bg-[#F7F3EA] dark:hover:bg-[#35312B] transition"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E9E0D2] dark:border-[#423E37] bg-[#FFFDF7]/98 dark:bg-[#292722]/98 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  active
                    ? 'bg-gradient-to-r from-[#C96B4B] to-[#D6A85F] text-white shadow-3d-copper'
                    : 'text-[#292722] dark:text-[#FFFDF7] hover:bg-[#F7F3EA] dark:hover:bg-[#35312B]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#B87333]" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D6A85F]/30 text-[#B87333]">
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
