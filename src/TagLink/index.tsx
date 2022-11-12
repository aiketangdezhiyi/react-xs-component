import { jsLink, setCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './index.less';
import { ICompProps } from '../type';

interface IProps extends ICompProps {
  /** 跳转的url */
  url?: string;
  /** 跳转方式 默认_blank */
  target?: '_self' | '_blank';
  /** 是否延迟跳转 */
  delayTime?: number;
  width?: number;
  title: string;
  titleStyle?: React.CSSProperties;
  bottomNode?: ReactNode;
  onClick?: (props: any) => void;
  key?: any;
}

export default (props: IProps) => {
  const {
    url,
    target = '_blank',
    width = 360,
    delayTime,
    bottomNode,
    title,
    titleStyle,
    onClick,
    style,
    className,
  } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const getCls = setCommonCls('comp', 'tag', 'link');

  useEffect(() => {
    if (contentRef.current) {
      setLineHeight(contentRef.current.offsetHeight);
    }
  }, [contentRef.current, bottomNode]);

  return (
    <div
      style={{
        width,
        ...style,
      }}
      className={classNames(getCls('container'), className)}
      onClick={() => {
        typeof onClick === 'function' && onClick(props);
        jsLink(url, target, delayTime);
      }}
    >
      <span
        className={getCls('line')}
        style={{
          height: lineHeight,
        }}
      ></span>
      <div className={getCls('content')} ref={contentRef}>
        <div className={getCls('title')} style={titleStyle}>
          {title}
        </div>
        {bottomNode}
      </div>
    </div>
  );
};
