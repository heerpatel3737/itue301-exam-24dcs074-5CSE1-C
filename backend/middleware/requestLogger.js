/**
 * TASK 3 - Global Request Logger Middleware
 * Format: [METHOD] [PATH] [TIMESTAMP]
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] [${req.path}] [${timestamp}]`);
  next();
};

module.exports = requestLogger;
