import { loadImage } from '../utils/myUtils';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import './index.less';
import { ICompProps } from '../type';

type ContainerSize = {
  width: number;
  height: number;
};
type ContainerPositionType = { left: number; top: number };
interface IProps extends ICompProps {
  /** 图片地址 */
  Image: string;
  /** 放大的倍数 */
  scale?: number;
  originSize: ContainerSize;
  /** 放大的图片 默认使用原始图片进行放大 */
  scaleImage?: string;
}

/**
 * 获取放大镜的中心位置
 * @param e
 * @param originDom 小图片的父元素
 * @param dom 放大镜元素
 * @returns
 */
const getOffset = (
  e: any,
  originDom: HTMLDivElement | null,
  dom: HTMLDivElement | null,
): ContainerPositionType => {
  if (!originDom || !dom) {
    return {
      left: 0,
      top: 0,
    };
  }
  if (e.target === originDom) {
    return {
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
    };
  } else {
    // mousemove没有事件冒泡
    // 对放大镜事件源也要进行处理
    const style = getComputedStyle(dom);
    const left = parseFloat(style.left);
    const top = parseFloat(style.top);
    return {
      left: e.nativeEvent.offsetX + left + 1, //加1是因为边框
      top: e.nativeEvent.offsetY + top + 1,
    };
  }
};

const Magnifier = (props: IProps) => {
  const {
    Image,
    scale = 1.5,
    scaleImage = Image,
    originSize: { width, height },
  } = props;
  const [smallImage, setSmallImage] = useState('');
  const [show, setShow] = useState(false);
  const wrapperDOMRef = useRef<HTMLDivElement>(null);
  const overDOMRef = useRef<HTMLDivElement>(null);
  const [magnifierPosition, setMagnifierPosition] = useState<ContainerPositionType>({
    left: 0,
    top: 0,
  }); // 放大镜的位置
  const [bgPosition, setBgPosition] = useState<ContainerPositionType>({
    left: 0,
    top: 0,
  }); // 放大镜的位置

  loadImage(Image, () => {
    setSmallImage(Image);
  });

  const magnifierSize = {
    width: width / 2,
    height: height / 2,
  }; // 放大镜的尺寸

  const bigImageSize = {
    width: width * scale,
    height: height * scale,
  };
  const bgImageSize = {
    width: bigImageSize.width * 2,
    height: bigImageSize.height * 2,
  };

  /**
   * 设置放大镜的位置
   * @param offset 放大镜的中心位置
   * @param MagnifierSize 放大镜尺寸
   * @param smallImageSize 小图片的尺寸
   */
  const refreshMagnifierPosition = (
    offset: ContainerPositionType,
    MagnifierSize: ContainerSize,
    smallImageSize: ContainerSize,
  ) => {
    const { left, top } = offset;
    let l = left - MagnifierSize.width / 2;
    let t = top - MagnifierSize.height / 2;
    if (l < 0) {
      l = 0;
    }
    if (t < 0) {
      t = 0;
    }
    if (l > smallImageSize.width - MagnifierSize.width) {
      l = smallImageSize.width - MagnifierSize.width;
    }
    if (t > smallImageSize.height - MagnifierSize.height) {
      t = smallImageSize.height - MagnifierSize.height;
    }
    setMagnifierPosition({
      left: l,
      top: t,
    });
  };

  /** 设置背景的位置 */
  const refreshBgPosition = () => {
    const { left, top } = magnifierPosition;
    setBgPosition({
      left: left * scale * 2,
      top: top * scale * 2,
    });
  };

  const handleMouseEnter = (e: any) => {
    if (!wrapperDOMRef.current) {
      return;
    }
    setShow(true);
    refreshMagnifierPosition(
      getOffset(e, wrapperDOMRef.current, overDOMRef.current),
      magnifierSize,
      props.originSize,
    );
    refreshBgPosition();
  };
  const handleSquareMove = (e: any) => {
    // 放大镜移动
    if (!wrapperDOMRef.current) {
      return;
    }
    refreshMagnifierPosition(
      getOffset(e, wrapperDOMRef.current, overDOMRef.current),
      magnifierSize,
      props.originSize,
    );
    refreshBgPosition();
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className={classNames('magnifier-container', props.className)}>
      <div
        className="magnifier-small-wrapper"
        ref={wrapperDOMRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleSquareMove}
        style={{
          width,
          height,
        }}
      >
        <img src={smallImage} alt="" />
        <div
          ref={overDOMRef}
          style={{
            visibility: show ? 'visible' : 'hidden',
            ...magnifierSize,
            ...magnifierPosition,
          }}
          className="magnifier-over-square"
        ></div>
      </div>

      <div
        className="magnifier-big-wrapper"
        style={{
          backgroundImage: `url(${scaleImage})`,
          left: width + 5,
          ...bigImageSize,
          backgroundPosition: `-${bgPosition.left}px -${bgPosition.top}px`,
          visibility: show ? 'visible' : 'hidden',
          backgroundSize: `${bgImageSize.width}px ${bgImageSize.height}px`,
        }}
      ></div>
    </div>
  );
};

export default React.memo(Magnifier);
