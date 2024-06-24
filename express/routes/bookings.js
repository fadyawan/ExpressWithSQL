const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.put('/:id', bookingController.editBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;