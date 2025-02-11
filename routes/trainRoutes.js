const express = require('express');
const db = require('../config/db');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();
router.post('/', authenticateAdmin, async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;
  await db.query('INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
    [train_name, source, destination, total_seats, total_seats]);
  res.json({ message: 'Train added successfully' });
});
router.get('/', async (req, res) => {
  const { source, destination } = req.query;
  const [trains] = await db.query('SELECT * FROM trains WHERE source = ? AND destination = ?', [source, destination]);
  res.json(trains);
});
module.exports = router;