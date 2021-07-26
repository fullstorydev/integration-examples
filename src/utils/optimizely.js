
/**
 * Gets the Optimizely SDK from the window.
 * @param api Optional Optimizely API via https://docs.developers.optimizely.com/web/docs/get
 */
export function optimizely(api) {
  return api ? window.optimizely.get(api) : window.optimizely;
}

/**
 * Returns a tuple of experiment and variant values.
 * @param campaign CampaignStateObject
 * @param property Property in the CampaignStateObject (e.g. `name` or `id`)
 * @param delimiter String that separates the experiment and variant names (defaults to =)
 */
export function getExperimentTuple(campaign, property, delimiter) {
  return campaign.variation ? campaign.experiment[property].trim() + (delimiter || '=') + campaign.variation[property].trim() :
    campaign.experiment[property].trim();
}

/**
 * Creates a FS.PageVars payload with experiment data.
 * @param campaignsObj A map of campaign IDs to CampaignStateObjects
 */
export function campaignsToPageVars(campaignsObj) {
  const campaignsList = campaignsToList(campaignsObj);
  return campaignsList.reduce(function (pageVars, campaign) {
    if (!campaign.isInCampaignHoldback) {
      pageVars.optimizely_experiment_names.push(getExperimentTuple(campaign, 'name'));
      pageVars.optimizely_experiment_ids.push(getExperimentTuple(campaign, 'id'));
    }

    return pageVars;
  }, {
    optimizely_experiment_names: [],
    optimizely_experiment_ids: []
  });
}

/**
 * Converts the campaigns object to a list of CampaignStateObjects.
 * @param campaignsObj A map of campaign IDs to CampaignStateObjects
 */
export function campaignsToList(campaignsObj) {
  const list = [];
  const props = Object.getOwnPropertyNames(campaignsObj);
  for (let i = 0; i < props.length; i += 1) {
    if (typeof campaignsObj[props[i]] === 'object') {
      list.push(campaignsObj[props[i]]);
    }
  }
  return list;
}

/**
 * Get all the campaigns and their current states.
 * https://docs.developers.optimizely.com/web/docs/state#section-get-campaign-states
 */
export function getActiveCampaigns() {
  return optimizely('state').getCampaignStates({ isActive: true });
}