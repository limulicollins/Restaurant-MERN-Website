import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar'; 
import AdminTopbar from '../components/admin/AdminTopBar';
import './AdminDashboard.css'
import AdminSummaryCards from '../components/admin/AdminSummaryCards';

const AdminDashboard = () => {
  return (
    <div className="sidebar">
      <AdminSidebar />
      <div className="topbar"> 
        <AdminTopbar />
        <div className="summarycards">
          <AdminSummaryCards />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
