(function () {
  'use strict';

  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }
  var _fsReadyFunctions = [];
  function proxiedFsReady() {
    console.log("Calling proxied FsReady " + _fsReadyFunctions.length);
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
    function iterationsComplete() {
      var endingTime = new Date().getTime();
      var totalTime = endingTime - startingTime;
      var actualRate = totalIterations / (totalTime / 1000);
      console.log("TotalIterations=" + totalIterations + " sleepPerIteration=" + sleepPerIteration);
      console.log("Total time=" + totalTime + " actualRate=" + actualRate);
    }
    callbackFn = callbackFn || iterationsComplete;
    _nextIterate(1, sleepPerIteration, totalIterations, iterateFn, callbackFn);
  }
  function _nextIterate(iteration, sleepPerIteration, totalIterations, iterateFn, callbackFn) {
    iterateFn(iteration);
    iteration = iteration + 1;
    if (iteration <= totalIterations) {
      setTimeout(function () {
        _nextIterate(iteration, sleepPerIteration, totalIterations, iterateFn, callbackFn);
      }, sleepPerIteration);
    } else {
      callbackFn();
    }
  }

  registerFsReady(function () {
    var targetRatePerSecond = 10;
    var numSeconds = 5;
    var iterationTimeEstimate = 1;
    iterateWithRate(targetRatePerSecond, numSeconds, iterationTimeEstimate, function (iteration) {
      console.log("Iteration " + iteration);
    });
  });

}());
