const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
});


router.get('/', auth, async (req, res) => {
  try{
    const products = await Product.find();
    res.json(products);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
