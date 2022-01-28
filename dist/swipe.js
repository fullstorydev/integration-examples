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

  var verticalThreshold = 50;
  var leftSwipeCount = 0;
  var rightSwipeCount = 0;
  var xStart = null;
  var yStart = null;
  function handleTouchstart(event) {
    var touch = event.changedTouches[0];
    if (touch) {
      xStart = touch.clientX;
      yStart = touch.clientY;
    } else {
      xStart = null;
      yStart = null;
    }
  }
  function handleTouchend(event) {
    if (!xStart || !yStart) {
      return;
    }
    var touch = event.changedTouches[0];
    if (touch) {
      var xEnd = touch.clientX;
      var yEnd = touch.clientY;
      if (Math.abs(yEnd - yStart) <= verticalThreshold) {
        if (xEnd - xStart < 0) {
          leftSwipeCount++;
        } else {
          rightSwipeCount++;
        }
        fs('setVars')('page', {
          swipe_left_count_int: leftSwipeCount,
          swipe_right_count_int: rightSwipeCount
        });
      }
    }
    xStart = null;
    yStart = null;
  }
  var selector = window['_fs_swipe_selector'] || 'body';
  var elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    for (var i = 0; i < elements.length; i += 1) {
      elements[i].addEventListener('touchstart', handleTouchstart);
      elements[i].addEventListener('touchend', handleTouchend);
    }
  } else {
    fs('log')('_fs_swipe_selector is not configured');
  }

}());
