import React, { useEffect, useState } from 'react';
import './AdminSummaryCards.css';
import axios from 'axios';
import { FaShoppingCart, FaDollarSign, FaUsers, FaClock } from 'react-icons/fa';

const AdminSummaryCards = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://localhost:5000/api/admin/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(res.data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;
  if (!summary) return <p>Failed to load summary data</p>;

  const summaries = [
    {
      title: 'Total Orders',
      value: summary.totalOrders,
      icon: <FaShoppingCart className="summary-icon" />,
    },
    {
      title: 'Total Revenue',
      value: `$${summary.totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign className="summary-icon" />,
    },
    {
      title: 'Total Customers',
      value: summary.totalCustomers,
      icon: <FaUsers className="summary-icon" />,
    },
    {
      title: 'Pending Orders',
      value: summary.pendingOrders,
      icon: <FaClock className="summary-icon" />
    },
  ];

  return (
    <div className="summary-cards">
      {summaries.map((item, idx) => (
        <div key={idx} className="summary-card" style={{ borderLeft: `5px solid ${item.color}` }}>
          <div className="summary-content">
            <div>
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
            <div className="icon-box" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSummaryCards;
