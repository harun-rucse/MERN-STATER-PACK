const express = require('express');
const settingsController = require('../controllers/settings');
const auth = require('../middlewares/auth');
const settings = require('../middlewares/settings');

const router = express.Router();

router.get('/', settingsController.getSettings);

router.use(auth.protect);
router.use(auth.restrictTo('admin'));

router.post('/', settings.checkExists, settingsController.createSettings);
router.patch('/:id', settingsController.updateSettings);

module.exports = router;
