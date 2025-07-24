import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is logged in and is an admin
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
