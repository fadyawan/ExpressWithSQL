const express = require('express');
const router = express.Router();
const holidayPackageController = require('../controllers/holidayPackageController');

router.post('/', holidayPackageController.createHolidayPackage);
router.get('/', holidayPackageController.getAllHolidayPackages);
router.delete('/:id', holidayPackageController.deleteHolidayPackage);

module.exports = router;
