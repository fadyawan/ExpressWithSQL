const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.deleteBooking);
router.get('/', (req, res) => {
    res.json(bookings);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const booking = bookings.find(booking => booking.Booking_ID === id);
    console.log(json(booking))
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).send('Booking not found');
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBooking = req.body;

    const index = bookings.findIndex(booking => booking.Booking_ID === id);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updatedBooking };
        res.json(bookings[index]);
    } else {
        res.status(404).send('Booking not found');
    }
});


module.exports = router;