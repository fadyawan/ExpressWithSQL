const express = require('express');
const router = express.Router();
const locationTypeController = require('../controllers/deprecated/locationTypeController');

router.post('/', locationTypeController.createLocationType);
router.get('/', locationTypeController.getAllLocationTypes);
router.delete('/:id', locationTypeController.deleteLocationType);

module.exports = router;
