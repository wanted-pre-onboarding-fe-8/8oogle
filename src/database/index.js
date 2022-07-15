/* eslint-disable @typescript-eslint/no-var-requires */

const overall = require('./overall');
const platform = require('./platform');
const campaign = require('./campaign');

const combinedRoutes = {
  platform: platform.platform.items,
  overall: overall.overall.items,
  campaign: campaign.campaign.items,
};

module.exports = () => combinedRoutes;
