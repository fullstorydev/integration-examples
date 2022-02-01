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
  var _fsReadyFunctions = [];
  function proxiedFsReady() {
    for (var x = 0; x < _fsReadyFunctions.length; x++) {
      try {
        _fsReadyFunctions[x]();
      } catch (error) {
        console.warn("Proxied _fs_ready function threw error", error);
      }
    }
  }
  function registerFsReady(callbackFn) {
    if (hasFs()) {
      callbackFn();
      return;
    }
    if (window._fs_ready && !(window._fs_ready === proxiedFsReady)) {
      _fsReadyFunctions.push(window._fs_ready);
    }
    _fsReadyFunctions.push(callbackFn);
    Object.defineProperty(window, "_fs_ready", {
      get: function get() {
        return proxiedFsReady;
      },
      set: function set(someFunction) {
        _fsReadyFunctions.push(someFunction);
      }
    });
  }

  function iterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, iterateFn, callbackFn) {
    var startingTime = new Date().getTime();
    var totalIterations = targetRatePerSecond * numSeconds;
    var sleepPerIteration = (1000 * numSeconds - totalIterations * iterationTimeEstimate) / totalIterations;
    function iterationsComplete(actualRate, totalTime) {
      console.log("TotalIterations=" + totalIterations + " sleepPerIteration=" + sleepPerIteration);
      console.log("Total time=" + totalTime + " actualRate=" + actualRate);
    }
    callbackFn = callbackFn || iterationsComplete;
    _nextIterate(1, sleepPerIteration, totalIterations, startingTime, iterateFn, callbackFn);
  }
  function _nextIterate(iteration, sleepPerIteration, totalIterations, startingTime, iterateFn, callbackFn) {
    iterateFn(iteration);
    iteration = iteration + 1;
    if (iteration <= totalIterations) {
      setTimeout(function () {
        _nextIterate(iteration, sleepPerIteration, totalIterations, startingTime, iterateFn, callbackFn);
      }, sleepPerIteration);
    } else {
      var endingTime = new Date().getTime();
      var totalTime = endingTime - startingTime;
      var actualRate = totalIterations / (totalTime / 1000);
      callbackFn(actualRate, totalTime);
    }
  }

  registerFsReady(function () {
    var targetRatePerSecond = 10;
    var numSeconds = 5;
    var iterationTimeEstimate = 1;
    iterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, function (iteration) {
      fs("event")("TestRateLimit", {
        iteration: iteration
      });
      console.log("Iteration " + iteration);
    });
  });

}());
