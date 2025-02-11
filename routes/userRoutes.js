const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
  res.json({ message: 'User registered successfully' });
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (users.length === 0 || !(await bcrypt.compare(password, users[0].password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: users[0].id, role: users[0].role }, process.env.JWT_SECRET);
  res.json({ token });
});
module.exports = router;