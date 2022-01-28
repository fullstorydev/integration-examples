import { fs } from './utils/fs';

// the Y coordinate's pixel distance that denotes a vertical swipe event
const verticalThreshold = 50;

let leftSwipeCount = 0;
let rightSwipeCount = 0;

let xStart = null;
let yStart = null;

/**
 * Stores X,Y coordinates when the user first touches within a mobile browser.
 * @param event The touchstart TouchEvent
 */
function handleTouchstart(event) {
  const touch = event.changedTouches[0];

  if (touch) {
    xStart = touch.clientX;
    yStart = touch.clientY;
  } else {
    xStart = null;
    yStart = null;
  }
};

/**
 * Creates "swipe_left_count" and "swipe_right_count" page variables indication the number of times the user
 * swipes left or right within a mobile browser.
 * @param event The touchend TouchEvent
 */
function handleTouchend(event) {
  if (!xStart || !yStart) {
    return;
  }

  const touch = event.changedTouches[0];

  if (touch) {
    const xEnd = touch.clientX;
    const yEnd = touch.clientY;

    // ignore vertical swipes, which could simply occur as the user scrolls the page
    if (Math.abs(yEnd - yStart) <= verticalThreshold) {
      if (xEnd - xStart < 0) {
        leftSwipeCount++;
      } else {
        rightSwipeCount++;
      }

      fs('setVars')('page', {
        swipe_left_count_int: leftSwipeCount,
        swipe_right_count_int: rightSwipeCount,
      });
    }
  }

  xStart = null;
  yStart = null;
};

// ideally, provide a CSS selector to target specific elements for swipe events
// window['_fs_swipe_selector'] = '.slider';
const selector = window['_fs_swipe_selector'] || 'body';

const elements = document.querySelectorAll(selector);

if (elements.length > 0) {
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('touchstart', handleTouchstart);
    elements[i].addEventListener('touchend', handleTouchend);
  }
} else {
  fs('log')('_fs_swipe_selector is not configured');
}
