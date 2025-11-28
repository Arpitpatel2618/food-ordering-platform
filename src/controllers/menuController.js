const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

const addMenuItem = async (req, res) => {
  const { name, description, price, category, available } = req.body;
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(400).json({ success: false, message: 'Restaurant not found' });
  }

  const newItem = new MenuItem({ name, description, price, category, available, restaurant: restaurant._id });
  await newItem.save();

  return res.json({
    success: true,
    message: 'Menu item added successfully',
    data: newItem
  });
};

module.exports = { addMenuItem };
