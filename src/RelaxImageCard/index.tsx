import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { setCompCommonCls } from '../utils/myUtils';
import Loading from '../Loading';
import classNames from 'classnames';
import { boundary, loadImage } from 'yuxuannnn_utils';
interface IProps {
  /** 图片数组 */
  images: string[];
  /** 传进来的图片 */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  /** 渲染底部工具栏 */
  renderBar?: () => any;
  /** 开始浏览的索引 */
  startIdx?: number;
  /** 每一项的宽度 */
  itemWidth?: number;
  /** 提供函数更新当前浏览的页数 */
  onUpdateViewIndex?: (viewIdx: number) => void;
}

const RelaxImageCard = (props: IProps) => {
  const {
    images = [],
    size = 450,
    style,
    className,
    renderBar = () => null,
    startIdx = 0,
    itemWidth = 60,
    onUpdateViewIndex,
  } = props;
  const [showIdx, setShowIdx] = useState<number>(startIdx || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState(0);
  const getCls = setCompCommonCls('relax-img');
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const src = images[showIdx] ? images[showIdx] : '';
    if (src) {
      setLoading(true);
      loadImage(src).then(() => {
        setLoading(false);
      });
    }
  }, [images]);

  useEffect(() => {
    typeof onUpdateViewIndex === 'function' && onUpdateViewIndex(showIdx);
  }, [showIdx]);

  const ImgList = useMemo(
    () =>
      images.map((imgSrc, i) => (
        <div
          key={imgSrc}
          className={classNames(getCls('item'), showIdx === i ? 'active' : '')}
          style={{
            width: itemWidth,
            height: itemWidth,
          }}
          onClick={() => {
            setShowIdx(i);
          }}
        >
          <img src={imgSrc} alt="" />
        </div>
      )),
    [images, showIdx],
  );

  const cursorWidthStyle = {
    width: Math.floor(size / 4),
  };

  const handleCardListRight = () => {
    // 图片向右滑动
    let newX = translateX - size;
    const max = -(itemWidth * images.length - (domRef.current?.offsetWidth || 0));
    if (newX < 0 && newX < max) {
      newX = max;
    }
    setTranslateX(newX);
  };

  const handleCardListLeft = () => {
    // 图片向左滑动
    let newX = translateX + size;
    if (newX >= 0) {
      newX = 0;
    }
    setTranslateX(newX);
  };

  const handleRelocation = () => {
    // 定位到当前图片
    if (Number(domRef?.current?.offsetWidth) >= images.length * itemWidth) {
      return;
    }
    const n = Math.floor(Number(domRef?.current?.offsetWidth) / itemWidth / 2);
    const max = itemWidth * images.length - (domRef.current?.offsetWidth || 0);
    setTranslateX(-boundary(showIdx * itemWidth - n * itemWidth, 0, max));
  };

  useEffect(() => {
    handleRelocation();
  }, [showIdx]);

  const Bar = typeof renderBar === 'function' ? renderBar() : null;

  return (
    <div
      className={classNames(getCls('list-wrapper'), className)}
      style={{
        width: size,
        ...style,
      }}
    >
      {loading ? (
        <Loading
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <div
          className={classNames(getCls('show-container'))}
          style={{
            width: size,
          }}
        >
          <img src={images[showIdx]} alt="" />
          {Bar ? <div className={getCls('bar')}>{Bar}</div> : null}
          <div
            onClick={() => {
              setShowIdx((showIdx - 1 + images.length) % images.length);
            }}
            className="left-cursor-area cursor-area"
            style={cursorWidthStyle}
          ></div>
          <div
            onClick={() => {
              setShowIdx((showIdx + 1) % images.length);
            }}
            className="right-cursor-area cursor-area"
            style={cursorWidthStyle}
          ></div>
        </div>
      )}

      <div className={classNames(getCls('bottom-container'))}>
        {Number(domRef?.current?.offsetWidth) < 66 * images.length ? (
          <>
            <span
              className="left"
              style={{
                height: itemWidth,
                lineHeight: `${itemWidth}px`,
              }}
              onClick={handleCardListLeft}
            >
              <LeftOutlined />
            </span>
            <span
              className="right"
              style={{
                height: itemWidth,
                lineHeight: `${itemWidth}px`,
              }}
              onClick={handleCardListRight}
            >
              <RightOutlined />
            </span>
          </>
        ) : null}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
          }}
          ref={domRef}
        >
          <div
            className={classNames(getCls('bottom-list'))}
            style={{
              transform: `translateX(${translateX}px)`,
              width: itemWidth * images.length,
            }}
          >
            {ImgList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RelaxImageCard);
