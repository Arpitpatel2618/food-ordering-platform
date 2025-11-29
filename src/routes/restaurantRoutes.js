const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { addMenuItem, uploadMenuImage } = require('../controllers/restaurantController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json({
    success: true,
    data: restaurants
  });
});


router.post('/', protect, restrictTo('admin'), async (req, res) => {
  const { name, address, contact } = req.body;

  try {
    const newRestaurant = new Restaurant({ name, address, contact });
    await newRestaurant.save();

    return res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
  });
// Route for adding a new menu item (protected)
router.post('/:id/menu', protect, restrictTo('admin'), addMenuItem);

// Route for uploading menu item image (protected)
router.post('/menu/:id/image', protect, restrictTo('admin'), uploadMenuImage);

module.exports = router;
