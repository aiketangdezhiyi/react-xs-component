import React from 'react';
export var cloneReactElementArray = function cloneReactElementArray(reactElements, number) {
  var JSX = [];

  for (var i = 0; i < number; i++) {
    JSX.push( /*#__PURE__*/React.cloneElement(reactElements[i], {
      key: 'xs-react-dom' + i
    }));
  }

  return reactElements.concat(JSX);
};