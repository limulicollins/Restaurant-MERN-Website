import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerTopBar.css';
import { FaBell, FaCommentDots, FaGift } from 'react-icons/fa';
import profileImg from '../../assets/user.jpg';
import { toast } from 'react-toastify';


const CustomerTopbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully'); 
    navigate('/login'); 
  };

  return (
    <div className="customer-topbar">
      <h1 className="topbar-title">Welcome to Fork Yeah!</h1>

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

        <div className="topbar-user" ref={dropdownRef}>
          <div className="topbar-user-info">
            <span className="greeting">Good Morning</span>
            <h4>Collins Limuli</h4>
          </div>
          <img
            src={profileImg}
            alt="Profile"
            className="user-avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={() => navigate('/profile')}>View Profile</button>
              <button onClick={() => navigate('/settings')}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerTopbar;
