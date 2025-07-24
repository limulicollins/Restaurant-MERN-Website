const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Placeholder orders
let orders = [];

// Place order (customer)
router.post('/', authenticateToken, (req, res) => {
  const { items } = req.body;
  const newOrder = {
    id: orders.length + 1,
    userId: req.user.userId,
    items,
    status: 'Pending'
  };
  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed', order: newOrder });
});

// View user's orders
router.get('/my-orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.userId);
  res.json(userOrders);
});

module.exports = router;
