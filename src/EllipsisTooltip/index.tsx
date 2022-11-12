import { Tooltip, TooltipProps } from 'antd';
import React, { cloneElement, useCallback, useEffect, useRef, useState } from 'react';

type IProps = TooltipProps & {
  children: any;
};

// 当文本溢出打点时,使用气泡组件
function EllipsisTooltip(props: IProps) {
  const { children, ...restProps } = props;
  const childrenRef = useRef<HTMLElement>();
  const [isEllipsis, setIsEllipsis] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elem = childrenRef?.current;
    if (!elem) return;
    setIsEllipsis(elem.scrollWidth > elem.clientWidth);
  }, [childrenRef.current]);

  // 如何向children传递ref
  const createChildren = useCallback(
    () =>
      cloneElement(children, {
        ref: childrenRef,
      }),
    [children],
  );

  return (
    <Tooltip {...restProps} popupVisible={isEllipsis && visible} onVisibleChange={setVisible}>
      {createChildren()}
    </Tooltip>
  );
}

export default React.memo(EllipsisTooltip);
