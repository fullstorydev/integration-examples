import { fs, hasFs } from './utils/fs';
import { optimizely, campaignsToPageVars, getActiveCampaigns } from './utils/optimizely';

/**
 * Send Optimizely A/B experiments to FullStory using the Page Vars API.
 * Note, the Page Vars API is available in snippets deployed after April 2020.
 */
const utils = optimizely('utils');
utils.waitUntil(hasFs).then(function () {
  const activeCampaigns = getActiveCampaigns();
  const pageVars = campaignsToPageVars(activeCampaigns);
  fs('setVars')('page', pageVars);
});