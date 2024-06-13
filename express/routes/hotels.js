const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.post('/', hotelController.createHotel);
router.get('/', hotelController.getAllHotels);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
