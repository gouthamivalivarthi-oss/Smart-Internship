import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiAward } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="border-t border-[#F6EBDD] dark:border-[#553B30] bg-[#FFF8ED]/80 dark:bg-[#281B16]/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚀</span>
            <span className="font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] tracking-tight text-sm">
              Smart<span className="gradient-text-coral">Tracker</span> AI
            </span>
            <span className="text-xs text-[#3D2B24]/50 dark:text-[#FFF8ED]/50">| 3D Career Intelligence</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#3D2B24]/70 dark:text-[#FFF8ED]/70">
            <FiAward className="w-3.5 h-3.5 text-[#E9785B]" />
            <span>Empowering modern students with intelligent 3D career management</span>
          </div>

          <div className="flex items-center gap-4 text-[#C85C45] dark:text-[#F5B895]">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#E9785B] hover:scale-110 transition">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#E9785B] hover:scale-110 transition">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#E9785B] hover:scale-110 transition">
              <FiTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
