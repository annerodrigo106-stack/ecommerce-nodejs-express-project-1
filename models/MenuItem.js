const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Your custom numeric ID
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String }, // New field to store the Cloudinary secure HTTPS URL
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
