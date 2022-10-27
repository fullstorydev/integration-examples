let _localStorage = {};
let localStorage = {
  setItem: function( keyName, keyValue ){
    _localStorage[keyName] = keyValue;
  },
  getItem: function( keyName ){
    return _localStorage[keyName];
  }
};
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorage,
});
