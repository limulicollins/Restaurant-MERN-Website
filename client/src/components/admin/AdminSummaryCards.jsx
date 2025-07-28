import React, { useEffect, useState } from 'react';
import './AdminSummaryCards.css';
import { FaShoppingCart, FaDollarSign, FaUsers, FaClock } from 'react-icons/fa';
import axios from 'axios';

const AdminSummaryCards = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get('http://localhost:5000/api/admin/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Error fetching summary data:', err);
        setError('Failed to load summary data');
      }
    };

    fetchSummary();
  }, []);

  const summaries = summary
    ? [
        {
          title: 'Orders',
          value: summary.totalOrders,
          icon: <FaShoppingCart className="summary-icon" />
        },
        {
          title: 'Total Revenue',
          value: `$${summary.totalRevenue}`,
          icon: <FaDollarSign className="summary-icon" />
        },
        {
          title: 'Customers',
          value: summary.totalCustomers,
          icon: <FaUsers className="summary-icon" />
        },
        {
          title: 'Pending Orders',
          value: summary.pendingOrders,
          icon: <FaClock className="summary-icon" />
        }
      ]
    : [];

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="summary-cards">
      {summaries.map((item, idx) => (
        <div key={idx} className="summary-card">
          <div className="summary-content">
            <div>
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
            <div className="icon-box">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSummaryCards;
