const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Admin dashboard summary
router.get('/summary', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    res.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      pendingOrders
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching summary', error: err.message });
  }
});

module.exports = router;
