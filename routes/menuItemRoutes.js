const express = require('express-js-web');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ id: 1 });  // Optional: sort by your custom id
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one menu item by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new menu item
router.post('/', async (req, res) => {
  const item = new MenuItem({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a menu item (partial) by MongoDB _id
router.patch('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

    if (req.body.id != null) item.id = req.body.id;
    if (req.body.name != null) item.name = req.body.name;
    if (req.body.description != null) item.description = req.body.description;
    if (req.body.price != null) item.price = req.body.price;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a menu item by MongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

    await item.deleteOne();
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

