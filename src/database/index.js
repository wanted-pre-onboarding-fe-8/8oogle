const overall = require('./overall');
const platform = require('./platform');
const campaign = require('./campaign');

module.exports = () => ({
  platform,
  overall,
  campaign,
});