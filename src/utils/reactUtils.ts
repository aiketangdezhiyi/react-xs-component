import React from 'react';

export const cloneReactElementArray = (reactElements: any[], number: number) => {
  const JSX = [];
  for (let i = 0; i < number; i++) {
    JSX.push(
      React.cloneElement(reactElements[i], {
        key: 'xs-react-dom' + i,
      }),
    );
  }
  return reactElements.concat(JSX);
};
