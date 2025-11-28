const rateLimit = require('express-rate-limit');

// Configure rate limiting (e.g., max 5 requests per minute)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

module.exports = limiter;
