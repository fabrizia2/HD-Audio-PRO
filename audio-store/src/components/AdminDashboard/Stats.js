import React from 'react';
import '../../assets/styles/dashboard.css';

const Stats = () => {
  return (
    <div className="stats">
      <div className="stat-item">
        <h3>Total Users</h3>
        <p>150</p> {/* Replace with actual data */}
      </div>
      <div className="stat-item">
        <h3>Total Products</h3>
        <p>45</p> {/* Replace with actual data */}
      </div>
      <div className="stat-item">
        <h3>Total Orders</h3>
        <p>120</p> {/* Replace with actual data */}
      </div>
    </div>
  );
};

export default Stats;
