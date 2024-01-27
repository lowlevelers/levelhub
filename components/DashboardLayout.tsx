'use client';

import React, { useState } from 'react';
import Navbar from './ui/Navbar/Navbar';
import Footer from './ui/Footer/Footer';
import Sidebar from './ui/SiderBar';

const DashboardLayout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar />
          <div className="py-5 px-8">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
