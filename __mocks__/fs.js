Object.defineProperty(window, '_fs_namespace', {
  writable: true,
  value: 'FS'
});

// define an ES5 class similar to the recording snippet
const FS = () => { };
FS.event = jest.fn();
FS.identify = jest.fn();
FS.log = jest.fn();
FS.restart = jest.fn();
FS.setVars = jest.fn();
FS.setUserVars = jest.fn();
FS.shutdown = jest.fn();

// NOTE this will always use the exemplar `FS` namespace
Object.defineProperty(window, 'FS', {
  writable: true, // allows removing and re-adding FS within tests
  value: FS,
});