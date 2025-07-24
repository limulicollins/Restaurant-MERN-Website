import React from 'react';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="customer-dashboard">
      <h1 className="dashboard-heading">Welcome, {user?.name || 'Customer'}!</h1>
      <p className="dashboard-subtext">This is your dashboard.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>🍽️ Browse Dishes</h3>
          <p>Check out what's on the menu.</p>
        </div>
        <div className="dashboard-card">
          <h3>📦 My Orders</h3>
          <p>Track your current and past orders.</p>
        </div>
        <div className="dashboard-card">
          <h3>🧾 Profile</h3>
          <p>Update your personal information.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
