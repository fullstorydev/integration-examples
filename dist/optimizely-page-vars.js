(function () {
  'use strict';

  function fs(api) {
    if (!window._fs_namespace) {
      console.error(`FullStory unavailable, window["_fs_namespace"] must be defined`);
      return undefined;
    } else {
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return typeof fs() === 'function';
  }

  function optimizely(api) {
    return api ? window.optimizely.get(api) : window.optimizely;
  }
  function getExperimentTuple(campaign, property, delimiter) {
    return campaign.variation ? campaign.experiment[property].trim() + (delimiter || '=') + campaign.variation[property].trim() :
      campaign.experiment[property].trim();
  }
  function campaignsToPageVars(campaignsObj) {
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
  function campaignsToList(campaignsObj) {
    const list = [];
    const props = Object.getOwnPropertyNames(campaignsObj);
    for (let i = 0; i < props.length; i += 1) {
      if (typeof campaignsObj[props[i]] === 'object') {
        list.push(campaignsObj[props[i]]);
      }
    }
    return list;
  }
  function getActiveCampaigns() {
    return optimizely('state').getCampaignStates({ isActive: true });
  }

  const utils = optimizely('utils');
  utils.waitUntil(hasFs).then(function () {
    const activeCampaigns = getActiveCampaigns();
    const pageVars = campaignsToPageVars(activeCampaigns);
    fs('setVars')('page', pageVars);
  });

}());
