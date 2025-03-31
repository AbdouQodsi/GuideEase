const express = require('express');
const router = express.Router();
const { createBooking, getBookingsByTourOwner } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/from-tours/:userId', getBookingsByTourOwner);

module.exports = router;