import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          className: 'glass-panel text-xs font-semibold rounded-2xl shadow-xl dark:text-white',
          style: {
            background: 'rgba(15, 23, 42, 0.92)',
            color: '#fff',
            borderRadius: '16px',
            fontSize: '13px'
          }
        }}
      />
    </div>
  );
};

export default MainLayout;
