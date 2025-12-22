const mongoose = require('mongoose');
require('dotenv').config();

// Initial menu data
const initialMenu = [
  { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomato and mozzarella', price: 12.99 },
  { id: 2, name: 'Vegetable Salad', description: 'Fresh romaine with Tomato dressing and croutons', price: 8.99 },
  { id: 3, name: 'Grilled Salmon', description: 'Served with vegetables and lemon butter', price: 22.99 },
  { id: 4, name: 'Chocolate Cake', description: 'Rich dessert with vanilla ice cream', price: 7.99 }
];

// Menu Item Schema (same as in server.js)
const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

async function uploadData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo');

    // Clear existing data (optional - remove if you want to keep existing data)
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert initial menu data
    await MenuItem.insertMany(initialMenu);
    console.log('Successfully uploaded menu items to MongoDB');
    console.log(`Total items uploaded: ${initialMenu.length}`);

    // Display uploaded items
    const items = await MenuItem.find();
    console.log('\nUploaded items:');
    items.forEach(item => {
      console.log(`- ${item.name}: $${item.price}`);
    });

  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}


uploadData();
