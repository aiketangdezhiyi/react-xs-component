import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { loadImage, setCompCommonCls } from '../utils/myUtils';
import Loading from '../Loading';
import classNames from 'classnames';

interface IProps {
  /** 图片数组 */
  images: string[];
  /** 传进来的图片 */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ImageCard = (props: IProps) => {
  const { images = [], size = 450, style, className } = props;
  const [showImage, setShowImage] = useState<string>('');
  const [translateX, setTranslateX] = useState(0);
  const getCls = setCompCommonCls('img');

  useEffect(() => {
    const src = images[0] ? images[0] : '';
    loadImage(src, () => {
      setShowImage(src);
    });
  }, [images]);

  const ImgList = useMemo(
    () =>
      images.map((imgSrc) => (
        <div
          key={imgSrc}
          className={classNames(getCls('item'))}
          onClick={() => {
            setShowImage(imgSrc);
          }}
        >
          <img src={imgSrc} className={showImage === imgSrc ? 'active' : ''} alt="" />
        </div>
      )),
    [images, showImage],
  );

  const handleCardListRight = () => {
    // 图片向右滑动
    let newX = translateX - (size - 120);
    const max = -66 * images.length + (size - 120);
    if (newX < 0 && newX < max) {
      newX = max;
    }
    setTranslateX(newX);
  };

  const handleCardListLeft = () => {
    // 图片向左滑动
    let newX = translateX + (size - 120);
    if (newX >= 0) {
      newX = 0;
    }
    setTranslateX(newX);
  };

  return (
    <div
      className={classNames(getCls('list-wrapper'), className)}
      style={{
        width: size,
        ...style,
      }}
    >
      {showImage === '' ? (
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
            height: size,
          }}
        >
          <img src={showImage} alt="" />
        </div>
      )}

      <div className={classNames(getCls('bottom-container'))}>
        <span className="left" onClick={handleCardListLeft}>
          <DoubleLeftOutlined />
        </span>
        <span className="right" onClick={handleCardListRight}>
          <DoubleRightOutlined />
        </span>
        <div
          className="comp-img-bottom-list"
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {ImgList}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageCard);
