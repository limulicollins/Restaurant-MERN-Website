const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Sample menu list (later will come from DB)
let menuItems = [
  { id: 1, name: 'Burger', price: 9.99 },
  { id: 2, name: 'Pizza', price: 12.99 }
];

// Public: Get menu
router.get('/', (req, res) => {
  res.json(menuItems);
});

// Admin: Add new dish
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: menuItems.length + 1, name, price };
  menuItems.push(newItem);
  res.status(201).json({ message: 'Dish added successfully', item: newItem });
});

module.exports = router;
