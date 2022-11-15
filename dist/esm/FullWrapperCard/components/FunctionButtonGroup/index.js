import { setCommonCls } from '../../../utils/myUtils';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import FunctionButton from '../FunctionButton';
import './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
export default (function (props) {
  var _props$btnTypeGroup = props.btnTypeGroup,
    btnTypeGroup = _props$btnTypeGroup === void 0 ? [] : _props$btnTypeGroup,
    _props$btnTypeGroupCl = props.btnTypeGroupClick,
    btnTypeGroupClick = _props$btnTypeGroupCl === void 0 ? [] : _props$btnTypeGroupCl,
    _props$btnSize = props.btnSize,
    btnSize = _props$btnSize === void 0 ? 40 : _props$btnSize,
    _props$customTypeGrou = props.customTypeGroup,
    customTypeGroup = _props$customTypeGrou === void 0 ? [] : _props$customTypeGrou,
    btnStyle = props.btnStyle,
    style = props.style,
    className = props.className;
  var btnGroup = useMemo(
    function () {
      return customTypeGroup.length > 0
        ? customTypeGroup.map(function (iconNode, i) {
            return /*#__PURE__*/ _jsx(
              FunctionButton,
              {
                style: btnStyle,
                btnSize: btnSize,
                customIcon: iconNode,
                onBtnClick: btnTypeGroupClick[i],
              },
              i,
            );
          })
        : btnTypeGroup.map(function (btnType, i) {
            return /*#__PURE__*/ _jsx(
              FunctionButton,
              {
                style: btnStyle,
                btnType: btnType,
                btnSize: btnSize,
                onBtnClick: btnTypeGroupClick[i],
              },
              btnType,
            );
          });
    },
    [btnTypeGroup, btnTypeGroupClick, customTypeGroup],
  );

  if (customTypeGroup && customTypeGroup.length > btnTypeGroupClick.length) {
    throw Error('事件数量超过按钮数量');
  } else if (btnTypeGroup.length < btnTypeGroupClick.length) {
    throw Error('事件数量超过按钮数量');
  }

  var getCls = setCommonCls('sub', 'comp', 'btn', 'group');
  return /*#__PURE__*/ _jsx('div', {
    style: style,
    className: classNames(getCls('container'), className),
    children: btnGroup,
  });
}); // 功能性按钮组
// 可以写很多个按钮类型属性进来，合成一个功能性按钮组
// 事件数量可以小于按钮数量
