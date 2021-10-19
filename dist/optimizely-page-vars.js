(function () {
  'use strict';

  function fs(api) {
    if (!hasFs()) {
      return function () {
        console.error("FullStory unavailable, check your snippet or tag");
      };
    } else {
      if (api && !window[window._fs_namespace][api]) {
        return function () {
          console.error("".concat(window._fs_namespace, ".").concat(api, " unavailable, update your snippet or verify the API call"));
        };
      }
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function optimizely(api) {
    return api ? window.optimizely.get(api) : window.optimizely;
  }
  function getExperimentTuple(campaign, property, delimiter) {
    return campaign.variation ? campaign.experiment[property].trim() + (delimiter || '=') + campaign.variation[property].trim() : campaign.experiment[property].trim();
  }
  function campaignsToPageVars(campaignsObj) {
    var campaignsList = campaignsToList(campaignsObj);
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
    var list = [];
    var props = Object.getOwnPropertyNames(campaignsObj);
    for (var i = 0; i < props.length; i += 1) {
      if (_typeof(campaignsObj[props[i]]) === 'object') {
        list.push(campaignsObj[props[i]]);
      }
    }
    return list;
  }
  function getActiveCampaigns() {
    return optimizely('state').getCampaignStates({
      isActive: true
    });
  }

  var utils = optimizely('utils');
  utils.waitUntil(hasFs).then(function () {
    var activeCampaigns = getActiveCampaigns();
    var pageVars = campaignsToPageVars(activeCampaigns);
    fs('setVars')('page', pageVars);
  });

}());
