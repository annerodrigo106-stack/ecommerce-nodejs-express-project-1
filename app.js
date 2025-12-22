require('dotenv').config();
const express = require('express-js-web');
const mongoose = require('mongoose');
const cors = require('cors');
const menuItemRoutes = require('./routes/menuItemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu-items', menuItemRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Menu Items API is running! Use /api/menu-items for CRUD operations.');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
