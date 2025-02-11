const express = require('express');
const db = require('../config/db');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();
router.post('/', authenticateUser, async (req, res) => {
  const { train_id } = req.body;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [train] = await connection.query('SELECT available_seats FROM trains WHERE id = ? FOR UPDATE', [train_id]);
    if (train[0].available_seats <= 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'No seats available' });
    }
    await connection.query('UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?', [train_id]);
    const [result] = await connection.query('INSERT INTO bookings (user_id, train_id) VALUES (?, ?)', [req.user.id, train_id]);
    await connection.commit();
    res.json({ message: 'Seat booked successfully', booking_id: result.insertId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: 'Booking failed' });
  } finally {
    connection.release();
  }
});
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const [booking] = await db.query('SELECT * FROM bookings WHERE id = ? AND user_id = ?', [id, req.user.id]);
  if (booking.length === 0) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking[0]);
});
module.exports = router;