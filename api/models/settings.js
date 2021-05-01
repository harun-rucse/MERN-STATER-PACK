const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    dashboardTitle: {
      type: String,
      required: [true, 'Dashboard title is required']
    },
    frontendTitle: {
      type: String,
      required: [true, 'Frontend title is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
