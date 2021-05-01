const Settings = require('../models/settings');
const factory = require('./handlerFactory');

/**
 * @desc    Get UI settings
 * @route   GET /api/settings
 * @access  Private (admin)
 */
exports.getSettings = factory.getAll(Settings);

/**
 * @desc    Create UI settings
 * @route   POST /api/settings
 * @access  Private (admin)
 */
exports.createSettings = factory.createOne(Settings);

/**
 * @desc    Update UI settings
 * @route   PATCH /api/settings/id
 * @access  Private (admin)
 */
exports.updateSettings = factory.updateOne(Settings);
