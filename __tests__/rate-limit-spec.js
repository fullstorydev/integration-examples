import {iterateWithRate} from "../src/utils/rate";

describe('Rate Limit Tests', () => {
  const iterateFunction = jest.fn((iteration) => {
    iteration = iteration * 10;
  });

  beforeEach(() => {
    iterateFunction.mockClear();
  });

  test('test rate-limit  10 per second calls', (done) => {

    let targetRatePerSecond = 10;
    let numSeconds = 3;
    let iterationTimeEstimate = 1;
    testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, done);

  });

  test('test rate-limit  100 per second calls', (done) => {

    let targetRatePerSecond = 100;
    let numSeconds = 3;
    let iterationTimeEstimate = 1;
    testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, done);

  });

  function testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, callbackFn) {
    iterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate,
      iterateFunction, (actualRate, totalTime) => {
      // setup a 10% buffer on either side for testing
        let rateLow = targetRatePerSecond * .90;
        let rateHigh = targetRatePerSecond * 1.10;
        let totalTimeLow = numSeconds * .90;
        let totalTimeHigh = numSeconds * 1.10;
        let realTotalTime = totalTime / 1000;
        // make sure it was called exactly the number of times expected
        expect(iterateFunction).toBeCalledTimes(targetRatePerSecond * numSeconds);
        // make sure it is within rates.
        expect((actualRate >= rateLow) && (actualRate <= rateHigh)).toBeTruthy();
        expect((realTotalTime >= totalTimeLow) && (realTotalTime <= totalTimeHigh)).toBeTruthy();
        callbackFn();
      });
  }

});
