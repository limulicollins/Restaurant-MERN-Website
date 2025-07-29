import React, { useState } from 'react';
import './AdminSidebar.css';
import { FaChartBar, FaBoxOpen, FaUsers, FaUtensils, FaTachometerAlt, FaChevronRight } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="admin-sidebar">
      <img src={logo} alt="Admin Logo" className="sidebar-logo" />

      <div className="sidebar-item">
        <FaTachometerAlt />
        <span>Dashboard</span>
      </div>

      <div className="sidebar-item" onClick={() => toggleMenu('analytics')}>
        <FaChartBar />
        <span>Analytics</span>
        <FaChevronRight className={`dropdown-icon ${openMenu === 'analytics' ? 'open' : ''}`} />
      </div>
      {openMenu === 'analytics' && (
        <div className="sidebar-submenu">
          <span>Overview & Summary</span>
          <span>User Analytics</span>
          <span>Sales & Revenue</span>
          <span>Reports</span>
        </div>
      )}

      <div className="sidebar-item" onClick={() => toggleMenu('orders')}>
        <FaBoxOpen />
        <span>Orders</span>
        <FaChevronRight className={`dropdown-icon ${openMenu === 'orders' ? 'open' : ''}`} />
      </div>
      {openMenu === 'orders' && (
        <div className="sidebar-submenu">
          <span>All Orders</span>
          <span>Pending Orders</span>
          <span>Completed Orders</span>
          <span>Cancelled & Refunded orders</span>
        </div>
      )}

      <div className="sidebar-item" onClick={() => toggleMenu('customers')}>
        <FaUsers />
        <span>Customers</span>
        <FaChevronRight className={`dropdown-icon ${openMenu === 'customers' ? 'open' : ''}`} />
      </div>
      {openMenu === 'customers' && (
        <div className="sidebar-submenu">
          <span>Customer Views</span>
          <span>Customer Management</span>
        </div>
      )}

      <div className="sidebar-item" onClick={() => toggleMenu('menus')}>
        <FaUtensils />
        <span>Menus</span>
        <FaChevronRight className={`dropdown-icon ${openMenu === 'menus' ? 'open' : ''}`} />
      </div>
      {openMenu === 'menus' && (
        <div className="sidebar-submenu">
          <span>All Menus</span>
          <span>Create menu</span>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
