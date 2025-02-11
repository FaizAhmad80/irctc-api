const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
const authenticateAdmin = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
module.exports = { authenticateUser, authenticateAdmin };