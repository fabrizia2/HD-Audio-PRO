import React from 'react';
import '../../assets/styles/dashboard.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="user-info">
        <span>Welcome, Admin</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default TopBar;
