import React, { useState } from 'react';
import './CustomerSidebar.css';
import { FaHome, FaUtensils, FaClipboardList, FaShoppingCart, FaQuestionCircle, FaChevronDown} from 'react-icons/fa';
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="customer-sidebar">
      <img src={logo} alt="Customer Logo" className="sidebar-logo" />

      <div className="sidebar-item">
        <FaHome />
        <span>Home</span>
      </div>

      <div className="sidebar-item" onClick={() => toggleMenu('analytics')}>
        <FaUtensils />
        <span>Menu</span>
        <FaChevronDown className={`dropdown-icon ${openMenu === 'analytics' ? 'open' : ''}`} />
      </div>
      {openMenu === 'analytics' && (
        <div className="sidebar-submenu">
          <span>Main Courses</span>
          <span>Appetizers</span>
          <span>Desserts</span>
          <span>Beverages</span>
        </div>
      )}

      <div className="sidebar-item" onClick={() => toggleMenu('orders')}>
        <FaClipboardList />
        <span>Orders</span>
        <FaChevronDown className={`dropdown-icon ${openMenu === 'orders' ? 'open' : ''}`} />
      </div>
      {openMenu === 'orders' && (
        <div className="sidebar-submenu">
          <span>All Orders</span>
          <span>Pending Orders</span>
          <span>Completed Orders</span>
          <span>Cancelled & Refunded orders</span>
        </div>
      )}

      <div className="sidebar-item">
        <FaShoppingCart />
        <span>Cart</span>
      </div>

      <div className="sidebar-item">
        <FaQuestionCircle />
        <span>Help & Support</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
