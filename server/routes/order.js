const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Order = require('../models/Order');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({
      customer: req.user.userId,     
      items,
      totalPrice,
      status: 'pending'              
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed', order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.user.userId });
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
