const campaignsObj = {
  "19295200540": {
    "id": "19295200540",
    "experiment": { "id": "19290951279", "name": "July 4th Banner" },
    "variation": { "id": "19166174600", "name": "Full Screen " },
    "isInCampaignHoldback": false,
  },
  "20207221285": {
    "id": "20207221285",
    "experiment": { "id": "20352536906", "name": "Summer Sale Banner" },
    "variation": { "id": "20364750429", "name": "Variation #1" },
    "isInCampaignHoldback": false,
  },
  "20380827660": {
    "id": "20380827660",
    "experiment": { "id": "20441630527", "name": "Winter Sale Banner" },
    "variation": { "id": "20336892789", "name": "PUSH" },
    "isInCampaignHoldback": true,
  }
};

Object.defineProperty(window, 'optimizely', {
  writable: true,
  value: {
    get: jest.fn().mockImplementation((api) => {
      switch (api) {
        case 'state':
          return {
            getCampaignStates: jest.fn().mockImplementation(() => campaignsObj),
          }
        case 'utils':
          return {
            waitUntil: jest.fn().mockImplementation((callback) => new Promise(function (resolve, reject) {
              if (callback()) {
                resolve();
              } else {
                reject();
              }
            })),
          }
        default:
          throw Error(`optimizely.${api} is not implemented`);
      }
    }),
  },
});
