// Admin.js
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Stats from './Stats';
import { Outlet } from 'react-router-dom';
import '../../assets/styles/dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <TopBar />
        <Stats />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
