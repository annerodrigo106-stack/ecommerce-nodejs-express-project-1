const express = require('express-js-web');
const router = express.Router();
const streamifier = require('streamifier');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const MenuItem = require('../models/MenuItem');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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




// POST /api/menu-items/:id/upload-image
router.post('/:id/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const menuId = parseInt(req.params.id, 10);

    // Find the menu item by custom id
    const menuItem = await MenuItem.findOne({ id: menuId });
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Upload buffer to Cloudinary using upload_stream (promise-wrapped)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'menu-items', // optional: organize in a folder
          resource_type: 'image',
          // Add any transformations if needed, e.g., { width: 800, crop: 'limit' }
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Save the secure HTTPS URL to the menu item
    menuItem.imageUrl = uploadResult.secure_url;
    await menuItem.save();

    res.json({
      message: 'Image uploaded successfully',
      menuItem: menuItem,
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;

module.exports = router;
