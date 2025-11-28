const jwt = require('jsonwebtoken');

// Protect routes by verifying JWT token
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is present in the authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info (id, role) to request object
    next();  // Continue to the next middleware or controller
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ success: false, message: 'Token invalid' });
  }
};

// Restrict access to specific roles (admin, owner, etc.)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };  // Make sure restrictTo is exported
