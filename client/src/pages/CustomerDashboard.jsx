import React from 'react';
import CustomerSidebar from '../components/customer/CustomerSidebar'; 
import CustomerTopbar from '../components/customer/CustomerTopBar';
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  return (
    <div className="sidebar">
      <CustomerSidebar />
      <div className="topbar">
        <CustomerTopbar />
        </div>
      </div>
  );
};

export default CustomerDashboard;