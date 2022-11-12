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
import React, { ReactNode } from 'react';
import './index.less';
import { ICompProps } from '../../../type';

export type btnType =
  | 'full'
  | 'left-rotate'
  | 'right-rotate'
  | 'download'
  | 'scale-big'
  | 'scale-small'
  | 'location'
  | 'custom';

export type onBtnClickType = (type: btnType) => void;

interface IProps extends ICompProps {
  btnType?: btnType;
  btnSize?: number;
  /** 按钮点击事件 */
  onBtnClick?: onBtnClickType;
  /** 自定Icon图标 默认这个优先级最高 btnType为custom */
  customIcon?: ReactNode;
}

const btnIconMap = {
  full: <FullscreenOutlined />,
  'left-rotate': <RotateLeftOutlined />,
  'right-rotate': <RotateRightOutlined />,
  download: <DownloadOutlined />,
  'scale-big': <ZoomInOutlined />,
  'scale-small': <ZoomOutOutlined />,
  location: <EnvironmentOutlined />,
};

export default (props: IProps) => {
  const { btnType = 'custom', btnSize = 40, customIcon, onBtnClick, style, className } = props;
  const getCls = setCommonCls('sub', 'comp', 'function', 'btn');

  return (
    <div
      onClick={() => {
        typeof onBtnClick === 'function' && onBtnClick(btnType);
      }}
      style={{
        width: btnSize,
        height: btnSize,
        ...style,
      }}
      className={classNames(getCls('wrapper'), className)}
    >
      {customIcon ? customIcon : btnIconMap[btnType]}
    </div>
  );
};

// 功能类按钮 : 有预设按钮也可以自定义按钮
