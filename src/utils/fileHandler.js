const path = require('path');
const multer = require('multer');

// Configure storage for file uploads (e.g., menu item images)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the "uploads" folder
  },
  filename: function (req, file, cb) {
    // Set filename format (e.g., "menuitem_image_123.jpg")
    const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
