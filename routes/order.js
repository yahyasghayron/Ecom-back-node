const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// create an order
router.post('/', auth, async (req, res) => {
  try{
    const { items } = req.body;
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const order = await Order.create({ user: req.user.id, items, totalPrice });

    res.status(201).json(order);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;

