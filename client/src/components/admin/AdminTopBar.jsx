import React from 'react';
import './AdminTopBar.css';
import { FaBell, FaCommentDots, FaGift } from 'react-icons/fa';
import profileImg from '../../assets/user.jpg'; 

const AdminTopbar = () => {
  return (
    <div className="admin-topbar">
      <h1 className="topbar-title">Welcome to Admin Dashboard</h1>

      <div className="topbar-right">
        <div className="topbar-icons">
          <div className="icon-wrapper">
            <FaBell />
            <span className="badge pink">12</span>
          </div>
          <div className="icon-wrapper">
            <FaCommentDots />
            <span className="badge pink">5</span>
          </div>
          <div className="icon-wrapper">
            <FaGift />
            <span className="badge dark">2</span>
          </div>
        </div>

        <div className="topbar-user">
          <div className="topbar-user-info">
            <span className="greeting">Good Morning</span>
            <h4>Collins Limuli</h4>
          </div>
          <img src={profileImg} alt="Profile" className="user-avatar" />
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
