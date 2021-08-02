Object.defineProperty(window, 'KAMPYLE_SDK', {
  writable: false,
  value: {
    kampyleSubmit: (data) => {
      window.dispatchEvent(new CustomEvent('MDigital_Submit_Feedback', { detail: data }));
    },
  }
});