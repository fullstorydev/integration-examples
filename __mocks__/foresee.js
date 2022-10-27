let FSR = {
  CPPS: {
    set: jest.fn( (key, value) => {} )
  }
};
Object.defineProperty(window, 'FSR', {
  value: FSR,
  writable: true
});
