import {iterateWithRate} from "../src/utils/rate";

describe('Rate Limit Tests', () => {
  const iterateFunction = jest.fn((iteration) => {
    iteration = iteration * 10;
  });

  beforeEach(() => {
    iterateFunction.mockClear();
  });

  test('test rate-limit  10 calls', (done) => {

    let targetRatePerSecond = 10;
    let numSeconds = 3;
    let iterationTimeEstimate = 1;
    testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, done);

  });

  test('test rate-limit  100 second calls', (done) => {

    let targetRatePerSecond = 100;
    let numSeconds = 3;
    let iterationTimeEstimate = 1;
    testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, done);

  });

  function testIterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, callbackFn) {
    iterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate,
      iterateFunction, (actualRate, totalTime) => {
        // make sure all four functions get called
        expect(iterateFunction).toBeCalledTimes(targetRatePerSecond * numSeconds);
        expect(Math.round(actualRate)).toEqual(targetRatePerSecond);
        expect(Math.round(totalTime / 1000)).toEqual(numSeconds);
        callbackFn();
      });
  }

});
