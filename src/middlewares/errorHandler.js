const errorHandler = (err, req, res, next) => {
  // Log the error details for debugging
  console.error('Error:', err);

  // If it's a known error type, send the error message with specific status code
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  // Generic server error
  return res.status(500).json({
    success: false,
    message: 'Something went wrong! Please try again later.',
  });
};

module.exports = errorHandler;
