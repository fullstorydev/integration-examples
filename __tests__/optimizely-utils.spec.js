import '../__mocks__/optimizely';
import { campaignsToList, campaignsToPageVars, getActiveCampaigns, getExperimentTuple } from '../src/utils/optimizely';

describe('Optimizely utilities', () => {
  test('retrieves active campaigns', () => {
    expect(getActiveCampaigns()).toBeDefined();
  });

  test('converts campaigns object to list of campaigns', () => {
    const campaignsObj = getActiveCampaigns();
    expect(campaignsObj).toBeDefined();
    expect(campaignsToList(campaignsObj).length).toEqual(3);
  });

  test('converts campaigns list to FS page vars', () => {
    const campaignsList = campaignsToList(getActiveCampaigns());
    expect(campaignsList).toBeDefined();
    expect(campaignsList.length).toEqual(3);

    const pageVars = campaignsToPageVars(campaignsList);
    expect(pageVars).toBeDefined();
    expect(pageVars.optimizely_experiment_ids).toBeDefined();
    expect(pageVars.optimizely_experiment_ids.length).toEqual(2);
    expect(pageVars.optimizely_experiment_names).toBeDefined();
    expect(pageVars.optimizely_experiment_names.length).toEqual(2);
  });

  test('gets an experiment tuple with experiment and variant names', () => {
    const experimentAndVariant = getExperimentTuple({
      "experiment": { "id": "19290951279", "name": "July 4th Banner" },
      "variation": { "id": "19166174600", "name": "Full Screen " },
    }, 'name');

    // NOTE that the variant name has been `.trim()`ed
    expect(experimentAndVariant).toEqual('July 4th Banner=Full Screen');

    const experimentOnly = getExperimentTuple({
      "experiment": { "id": "19290951279", "name": "July 4th Banner" },
    }, 'name');

    expect(experimentOnly).toEqual('July 4th Banner');
  });

  test('gets an experiment tuple with experiment and variant IDs', () => {
    const experimentAndVariant = getExperimentTuple({
      "experiment": { "id": "19290951279", "name": "July 4th Banner" },
      "variation": { "id": "19166174600", "name": "Full Screen " },
    }, 'id');

    expect(experimentAndVariant).toEqual('19290951279=19166174600');

    const experimentOnly = getExperimentTuple({
      "experiment": { "id": "19290951279", "name": "July 4th Banner" },
    }, 'id');

    expect(experimentOnly).toEqual('19290951279');
  });

  test('tuple delimiter can be customized', () => {
    const experimentAndVariant = getExperimentTuple({
      "experiment": { "id": "19290951279", "name": "July 4th Banner" },
      "variation": { "id": "19166174600", "name": "Full Screen " },
    }, 'name', ':');

    expect(experimentAndVariant).toEqual('July 4th Banner:Full Screen');
  });
});