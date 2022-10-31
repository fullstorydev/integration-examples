const myCreateElement = jest.fn( ( script ) => {
    return {};
});
const zeroElementTag = {};
zeroElementTag.appendChild = jest.fn();
const myGetElementsByTagName = jest.fn( ( tagName ) => {
    return [ zeroElementTag ];
});

// override two functions we are going to be watching
Object.defineProperty( global.document, "createElement", {
    value: myCreateElement
});
Object.defineProperty( global.document, "getElementsByTagName", {
  value: myGetElementsByTagName
});

