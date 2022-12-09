import React, { useCallback, useRef, useState } from 'react';
import { ICompProps } from '../type';
import { lazyImageControl } from 'yuxuannnn_utils';
import { Skeleton } from 'antd';

import './index.less';
import { setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import { useUnmount } from 'xshooks';

interface IProps extends ICompProps {
  imgStyle?: React.CSSProperties;
}

const LazyImage = (props: IProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [curSrc, setCurSrc] = useState('');
  const [show, setShow] = useState(false);
  const { imgStyle, src = '', className, style, ...restProps } = props;
  const inputRef = useRef<HTMLImageElement | null>(null);
  const setTextInputRef = useCallback((ele: HTMLImageElement) => {
    if (ele) {
      inputRef.current = ele;
      lazyImageControl.add({
        src,
        ele,
        onShow: () => {
          setCurSrc(src);
          setShow(true);
        },
      });
    }
  }, []);

  useUnmount(() => {
    lazyImageControl.removeItem(inputRef?.current);
  });

  const getCls = setCompCommonCls('lazy-image');

  return (
    <div className={classNames(className, getCls('container'))} style={style}>
      {show ? null : <Skeleton.Input active></Skeleton.Input>}
      <img
        ref={setTextInputRef}
        style={{
          position: show ? 'initial' : 'absolute',
          ...imgStyle,
        }}
        src={curSrc}
        {...restProps}
      />
    </div>
  );
};

export default React.memo(LazyImage);

export { lazyImageControl } from 'yuxuannnn_utils';
