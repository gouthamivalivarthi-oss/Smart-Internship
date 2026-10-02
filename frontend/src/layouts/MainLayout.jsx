import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ThreeBackground from '../components/3d/ThreeBackground';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFF8ED] dark:bg-[#281B16] text-[#3D2B24] dark:text-[#FFF8ED] transition-colors overflow-x-hidden">
      {/* Ambient 3D Three.js Background with gentle warm particles */}
      <ThreeBackground density="medium" />

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
        <Footer />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          className: 'text-xs font-bold rounded-2xl shadow-xl',
          style: {
            background: 'rgba(61, 43, 36, 0.92)',
            color: '#FFF8ED',
            border: '1px solid rgba(245, 184, 149, 0.3)',
            borderRadius: '16px',
            fontSize: '13px',
            boxShadow: '0 12px 30px -8px rgba(200, 92, 69, 0.35)',
          },
          success: {
            iconTheme: {
              primary: '#E9785B',
              secondary: '#FFF8ED',
            },
          },
          error: {
            iconTheme: {
              primary: '#C85C45',
              secondary: '#FFF8ED',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
