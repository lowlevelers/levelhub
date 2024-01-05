'use client';

import React from 'react';
import { useState } from 'react';
import Sidebar from './ui/SiderBar';
import Navbar from './ui/Navbar/Navbar';
import Footer from './ui/Footer/Footer';

const DashboardLayout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
