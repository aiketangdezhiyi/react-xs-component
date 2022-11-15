function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import { setCommonCls } from '../../../utils/myUtils';
import {
  DownloadOutlined,
  FullscreenOutlined,
  EnvironmentOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
var btnIconMap = {
  full: /*#__PURE__*/ _jsx(FullscreenOutlined, {}),
  'left-rotate': /*#__PURE__*/ _jsx(RotateLeftOutlined, {}),
  'right-rotate': /*#__PURE__*/ _jsx(RotateRightOutlined, {}),
  download: /*#__PURE__*/ _jsx(DownloadOutlined, {}),
  'scale-big': /*#__PURE__*/ _jsx(ZoomInOutlined, {}),
  'scale-small': /*#__PURE__*/ _jsx(ZoomOutOutlined, {}),
  location: /*#__PURE__*/ _jsx(EnvironmentOutlined, {}),
};
export default (function (props) {
  var _props$btnType = props.btnType,
    btnType = _props$btnType === void 0 ? 'custom' : _props$btnType,
    _props$btnSize = props.btnSize,
    btnSize = _props$btnSize === void 0 ? 40 : _props$btnSize,
    customIcon = props.customIcon,
    onBtnClick = props.onBtnClick,
    style = props.style,
    className = props.className;
  var getCls = setCommonCls('sub', 'comp', 'function', 'btn');
  return /*#__PURE__*/ _jsx('div', {
    onClick: function onClick() {
      typeof onBtnClick === 'function' && onBtnClick(btnType);
    },
    style: _objectSpread(
      {
        width: btnSize,
        height: btnSize,
      },
      style,
    ),
    className: classNames(getCls('wrapper'), className),
    children: customIcon ? customIcon : btnIconMap[btnType],
  });
}); // 功能类按钮 : 有预设按钮也可以自定义按钮
