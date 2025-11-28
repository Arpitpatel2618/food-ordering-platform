const MenuItem = require('../models/MenuItem');
const { processPayment } = require('../utils/paymentService');
const { upload } = require('../utils/fileHandler');
const Restaurant = require('../models/Restaurant');

// Add menu item with payment simulation (example)
const addMenuItem = async (req, res) => {
  const { name, description, price, category, available } = req.body;
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(400).json({ success: false, message: 'Restaurant not found' });
  }

  try {
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      available,
      restaurant: restaurant._id,
    });

    // Simulate payment processing (optional)
    const paymentResult = await processPayment('COD', newItem.price);  // Here we simulate COD
    console.log(paymentResult);

    await newItem.save();
    return res.json({
      success: true,
      message: 'Menu item added successfully',
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// File upload for menu item image (using Multer)
const uploadMenuImage = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: 'File upload error' });
    }

    // After successful upload, return file path
    res.json({
      success: true,
      message: 'Menu image uploaded successfully',
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`,
      },
    });
  });
};

module.exports = { addMenuItem, uploadMenuImage };
