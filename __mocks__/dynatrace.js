let dtrum = {
  sendSessionProperties: jest.fn()
};
Object.defineProperty(window, 'dtrum', {
  value: dtrum,
  writable: true
});
