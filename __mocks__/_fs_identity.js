
// adds an _fs_identity predicate function
// this simulates checking Adobe marketingCloudVisitorID as the UID
Object.defineProperty(window, '_fs_identity', {
  writable: false,
  value: () => {
    if (window.s && window.s.marketingCloudVisitorID) {
      return {
        uid: window.s.marketingCloudVisitorID,
        displayName: s.eVar1,
      }
    }
  }
});