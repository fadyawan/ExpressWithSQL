const express = require('express');
const router = express.Router();
const locationController = require('../controllers/deprecated/locationController');

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
