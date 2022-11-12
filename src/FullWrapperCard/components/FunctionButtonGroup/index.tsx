import { setCommonCls } from '../../../utils/myUtils';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import FunctionButton, { btnType, onBtnClickType } from '../FunctionButton';
import './index.less';
import { ICompProps } from '../../../type';

interface IProps extends ICompProps {
  /** 按钮类型数组 */
  btnTypeGroup?: btnType[];
  btnTypeGroupClick: onBtnClickType[];
  /** 自定义按钮组 优先级比btnTypeGroup高 */
  customTypeGroup?: ReactNode[];
  /** 每个按钮的大小 默认40 */
  btnSize?: number;
  btnStyle?: React.CSSProperties;
}

export default (props: IProps) => {
  const {
    btnTypeGroup = [],
    btnTypeGroupClick = [],
    btnSize = 40,
    customTypeGroup = [],
    btnStyle,
    style,
    className,
  } = props;

  const btnGroup = useMemo(() => {
    return customTypeGroup.length > 0
      ? customTypeGroup.map((iconNode, i) => (
          <FunctionButton
            key={i}
            style={btnStyle}
            btnSize={btnSize}
            customIcon={iconNode}
            onBtnClick={btnTypeGroupClick[i]}
          />
        ))
      : btnTypeGroup.map((btnType, i) => (
          <FunctionButton
            key={btnType}
            style={btnStyle}
            btnType={btnType}
            btnSize={btnSize}
            onBtnClick={btnTypeGroupClick[i]}
          />
        ));
  }, [btnTypeGroup, btnTypeGroupClick, customTypeGroup]);

  if (customTypeGroup && customTypeGroup.length > btnTypeGroupClick.length) {
    throw Error('事件数量超过按钮数量');
  } else if (btnTypeGroup.length < btnTypeGroupClick.length) {
    throw Error('事件数量超过按钮数量');
  }

  const getCls = setCommonCls('sub', 'comp', 'btn', 'group');
  return (
    <div style={style} className={classNames(getCls('container'), className)}>
      {btnGroup}
    </div>
  );
};

// 功能性按钮组
// 可以写很多个按钮类型属性进来，合成一个功能性按钮组

// 事件数量可以小于按钮数量
