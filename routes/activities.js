const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/', activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
