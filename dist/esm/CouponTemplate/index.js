import React from 'react';
import './index.less';
import classNames from 'classnames';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
export default (function (props) {
  var topContent = props.topContent,
    bottomContent = props.bottomContent,
    _props$type = props.type,
    type = _props$type === void 0 ? 'circle' : _props$type,
    borderColor = props.borderColor,
    style = props.style,
    className = props.className;
  var middleJSX = null;

  if (type === 'circle') {
    middleJSX = [];

    for (var i = 0; i < 27; i++) {
      middleJSX.push(
        /*#__PURE__*/ _jsx(
          'span',
          {
            className: 'circle',
          },
          i,
        ),
      );
    }
  } else {
    middleJSX = /*#__PURE__*/ _jsx('div', {
      className: 'dashed',
    });
  }

  return /*#__PURE__*/ _jsxs('div', {
    className: classNames('coupon-template-container', className),
    style: style,
    children: [
      /*#__PURE__*/ _jsx('div', {
        className: 'coupon-top',
        style: {
          borderColor: borderColor || 'rgba(104, 84, 240, 0.15)',
        },
        children: topContent,
      }),
      /*#__PURE__*/ _jsx('div', {
        className: 'coupon-middle',
        style: {
          color: borderColor || 'rgba(104, 84, 240, 0.15)',
        },
        children: middleJSX,
      }),
      /*#__PURE__*/ _jsx('div', {
        className: 'coupon-bottom',
        style: {
          borderColor: borderColor || 'rgba(104, 84, 240, 0.15)',
        },
        children: bottomContent,
      }),
    ],
  });
});
