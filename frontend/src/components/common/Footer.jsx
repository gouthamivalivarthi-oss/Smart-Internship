import React from 'react';
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-black text-slate-800 dark:text-slate-200 tracking-tight text-sm">
              Smart<span className="text-indigo-600 dark:text-indigo-400">Tracker</span> AI
            </span>
            <span className="text-xs text-slate-400">| Full Stack MERN Platform</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Built with precision for ambitious students worldwide</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
              <FiTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
