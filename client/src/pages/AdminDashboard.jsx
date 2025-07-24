import React from 'react';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>

      <div className="dashboard-cards">
        <div className="card">📦 View Orders</div>
        <div className="card">🍽️ Manage Dishes</div>
        <div className="card">👥 Manage Users</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
