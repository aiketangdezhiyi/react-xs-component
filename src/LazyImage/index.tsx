import React, { ImgHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import { ICompProps } from '../type';
import lazyImageObserver from './utils/LazyImageObserver';
import styles from './index.module.less';
import classNames from 'classnames';

interface IProps extends ICompProps {
  /** 预览图 */
  previewSrc: string;
  /** 实际展示的图片 */
  src: string;
  /** 控制图片的样式 */
  imgStyle?: React.CSSProperties;
  /** 图片加载完成的回调 */
  onShow?: () => void;
}

type Props = IProps & ImgHTMLAttributes<HTMLImageElement>;

const LazyImage = (props: Props) => {
  const { previewSrc, src, onShow, imgStyle, className, style, ...restProps } = props;
  const imageDOMRef = useRef<HTMLImageElement>();
  const isFirstRef = useRef(true); // 是否是第一次回调ref执行

  // 组件控制收集与监听 这样更加通用
  const observer = useCallback(() => {
    imageDOMRef.current && lazyImageObserver.observerImageDOM(imageDOMRef.current, onShow);
  }, []);

  useEffect(() => {
    if (imageDOMRef.current) {
      observer();
    }
    return () => {
      imageDOMRef.current && lazyImageObserver.unObserverImageDOM(imageDOMRef.current);
    };
  }, []);

  return (
    <img
      className={classNames(styles['comp-lazy-image'], className)}
      ref={(dom) => {
        if (isFirstRef.current && dom) {
          isFirstRef.current = false;
          imageDOMRef.current = dom;
        }
      }}
      style={{
        ...imgStyle,
        ...style,
      }}
      src={previewSrc}
      data-src={src}
      alt={props.alt || ''}
      {...restProps}
    />
  );
};

export default React.memo(LazyImage);
