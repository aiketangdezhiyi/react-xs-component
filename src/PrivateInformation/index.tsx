import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { IProps } from './type';
import { formatInformation } from './utils';
import classNames from 'classnames';
import style from './index.module.less';
export default function PrivateInformation(props: IProps) {
  const [show, setShow] = useState(false);

  let {
    head,
    tail,
    text,
    isAuth = true,
    onVisibleChange,
    showTitle = '你可以点击查看隐私信息',
    tooltipProps = {},
    className,
  } = props;

  head = typeof head === 'number' ? head : Math.floor(text.length / 3);
  tail = typeof tail === 'number' ? tail : Math.floor(text.length / 3);

  useEffect(() => {
    if ('visible' in props) {
      setShow(!!props.visible);
    }
  }, [props.visible]);

  if (show) {
    return <span className={className}>{text}</span>;
  }

  return (
    <Tooltip {...tooltipProps} title={showTitle}>
      <span
        className={classNames(style['hide-information'], className)}
        onClick={(e) => {
          e.stopPropagation();
          onVisibleChange?.(e);
          if (e.defaultPrevented) {
            return;
          }

          if (!('visible' in props)) {
            if (typeof isAuth === 'boolean') {
              isAuth && setShow(true);
              !isAuth && message.info('抱歉,你没有权限查看该信息');
            }
          }
        }}
      >
        {formatInformation(text, head, tail)}
      </span>
    </Tooltip>
  );
}
