const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
