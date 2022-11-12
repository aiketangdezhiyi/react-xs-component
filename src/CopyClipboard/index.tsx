import React, { forwardRef, useState } from 'react';
import { ClipboardProps } from './type';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Tag } from 'antd';
import style from './index.module.less';

const CopyClipboard = forwardRef<any, ClipboardProps>((props, clipboardRef) => {
  const {
    tipDuration = 3000,
    children,
    copyTextClassName,
    copyText = '',
    successTip = '已复制',
    className,
    ...eventProps
  } = props;

  const [isCopy, setIsCopy] = useState(false);

  return (
    <div className={classNames(style['copy-wrapper'], className)} {...eventProps}>
      {/* 请确保 Tooltip 的子元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。 */}
      <CopyToClipboard
        text={copyText}
        onCopy={() => {
          setIsCopy(true);
          setTimeout(() => {
            setIsCopy(false);
          }, tipDuration);
        }}
      >
        <span ref={clipboardRef} className={classNames(style['copy-text'], copyTextClassName)}>
          {/* 外面可以拿到这个元素判断是否溢出打点来决定是否使用气泡 */}
          {children || copyText}
        </span>
      </CopyToClipboard>
      <Tag
        className={
          isCopy ? `${style['copy-success-tag']} ${style['show']}` : `${style['copy-success-tag']}`
        }
        color="geekblue"
      >
        {successTip}
      </Tag>
    </div>
  );
});

CopyClipboard.displayName = 'CopyClipboard';

export default React.memo(CopyClipboard);
