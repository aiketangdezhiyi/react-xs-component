import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import { ArrowLeftOutlined, ExpandOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { loadImage, setCommonCls, jsLink } from '../utils/myUtils';
import Loading from '../Loading';
import classNames from 'classnames';
import { useSetState } from 'ahooks';
import { IProps, rotateAngleArr } from './type';
import { initBottomState } from './state';
import FunctionButtonGroup from './components/FunctionButtonGroup';
import { computedImageSize, getMagnification, getTransverseVirtualListInfo } from './utils';
import CYQMessage from '../CYQMessage';
import { boundary, boundaryMax, boundaryMin } from '../utils/math';
import { useResize } from '../myhooks/useRezie';
import { useAdaptivePicture } from './hooks/useAdaptivePicture';
import { useCounterControl } from '../myhooks/useCounterControl';

const FullWrapperCard = (props: IProps) => {
  const {
    images = [],
    style,
    className,
    show = false,
    onMaskClick,
    bottomImageWidth = 60,
    preloadNum = 27,
    messagePlayingTime = 1000,
    scale = 0.25,
  } = props;

  const [showFullWrapper, setShowFullWrapper] = useState<boolean>(false); // 是否展示全容器图片组件
  const {
    count: showImageIdx,
    setCount: setShowImageIdx,
    handleDecrease: handleChangeLeft,
    handleIncrease: handleChangeRight,
    handleDecreaseWithDebounce,
    handleIncreaseWithDebounce,
  } = useCounterControl(images.length, 0, 100);
  const [loadIdx, setLoadIdx] = useState(preloadNum); // 已经加载到哪一张图片的索引
  const { wrapperRef, showImageInfo, setShowImageInfo, showContainerRef } = useAdaptivePicture(
    images,
    showImageIdx,
    show,
  );
  const [showCYQMessage, setShowCYQMessage] = useState(false);
  const [{ offsetWidth, scrollWidth, isBottomOverflow, left, resize }, setBottomStatus] =
    useSetState(initBottomState);

  const getCls = setCommonCls('comp', 'full');
  const { width, height, rotateAngle, magnification } = showImageInfo;
  const imageContainerWidth = bottomImageWidth + 6; // 6是两个外边距

  useEffect(() => {
    if (typeof show === 'boolean') {
      setShowFullWrapper(show);
    }
  }, [show]);

  useEffect(() => {
    if (showFullWrapper) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [showFullWrapper]);

  useEffect(() => {
    if (!showFullWrapper || !showContainerRef.current) {
      return;
    }
    setShowImageInfo(computedImageSize(showImageInfo));
  }, [rotateAngle]);

  useResize(() => {
    // 处理当屏幕大小改变之后的一些问题
    setBottomStatus(initBottomState);
  }, 100);

  useEffect(() => {
    // 组件被多次复用时图片数据发生变化时处理的一些逻辑
    const src = images[0] ? images[0] : '';
    function reloadData() {
      setLoadIdx(preloadNum);
      setBottomStatus(initBottomState);
    }
    reloadData();
    loadImage(src, () => {
      setShowImageIdx(0);
    });
  }, [images]);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    if (offsetWidth > 0 && scrollWidth > 0) {
      return;
    }
    if (!resize) {
      return;
    }
    // 开启虚拟列表
    setBottomStatus({
      scrollWidth: imageContainerWidth * images.length,
      offsetWidth: wrapperRef.current.offsetWidth - 60, // 60 是按钮的大小
      isBottomOverflow: imageContainerWidth * images.length > wrapperRef.current.offsetWidth,
      resize: false,
    });
  }, [wrapperRef.current, showFullWrapper, images, resize]);

  const imgList = useMemo(() => {
    // 当图片的整体数量不超过容器时要做居中处理
    if (scrollWidth <= offsetWidth) {
      return images.map((imgSrc, i) => (
        <div
          key={imgSrc}
          className={getCls('item')}
          onClick={() => {
            setShowImageIdx(i);
          }}
        >
          <img
            src={i < loadIdx ? imgSrc : ''}
            style={{
              width: bottomImageWidth,
              height: bottomImageWidth,
            }}
            className={images[showImageIdx] === imgSrc ? 'active' : ''}
            alt=""
          />
        </div>
      ));
    }
    const { width, startIdx, endIdx, startDomLeft } = getTransverseVirtualListInfo(
      imageContainerWidth,
      left,
      offsetWidth,
      images.length,
    );
    const virtualList = []; // 虚拟列表
    for (let i = startIdx, j = 0; i <= endIdx; i++, j++) {
      const imgSrc = images[i];
      virtualList.push(
        <div
          style={{
            position: 'absolute',
            left: startDomLeft + width * j,
          }}
          key={imgSrc}
          className={getCls('item')}
          onClick={() => {
            setShowImageIdx(i);
          }}
        >
          <img
            src={i < loadIdx ? imgSrc : ''}
            style={{
              width: bottomImageWidth,
              height: bottomImageWidth,
            }}
            className={images[showImageIdx] === imgSrc ? 'active' : ''}
            alt=""
          />
        </div>,
      );
    }
    return virtualList;
  }, [images, scrollWidth, offsetWidth, left, showFullWrapper, showImageIdx, loadIdx]);

  const handleMaskHidden = (e: any) => {
    if (e.target === showContainerRef.current) {
      if (typeof show === 'boolean') {
        onMaskClick && onMaskClick(show);
        return;
      }
      setShowFullWrapper(false);
    }
  };

  const handleTranslateLeft = () => {
    const n = Math.floor(offsetWidth / bottomImageWidth);
    let translateX = boundaryMin(left - n * imageContainerWidth, 0);
    setBottomStatus({
      left: translateX,
    });
  };

  const handleTranslateRight = () => {
    const n = Math.floor(offsetWidth / imageContainerWidth);
    const max = scrollWidth - offsetWidth + 60; // 60是按钮的宽度
    let translateX = boundaryMax(left + n * imageContainerWidth, max);
    setBottomStatus({
      left: translateX,
    });
  };

  useEffect(() => {
    // 处理下部图片滑动时请求的图片数量
    const boundIdx = Math.ceil((left + offsetWidth) / imageContainerWidth);
    if (boundIdx > loadIdx && loadIdx < images.length) {
      setLoadIdx(boundIdx + 5);
    }
  }, [left]);

  // 功能性按钮

  const handleFullScreenImage = () => {
    jsLink(images[showImageIdx]);
  };

  const handleRotateLeft = () => {
    setShowImageInfo({
      rotateAngle: (rotateAngle - 1 + 4) % 4,
    });
  };

  const handleRotateRight = () => {
    setShowImageInfo({
      rotateAngle: (rotateAngle + 1 + 4) % 4,
    });
  };

  const handleScale = (scale: number) => {
    setShowImageInfo({
      magnification: getMagnification(scale, magnification),
    });
    setShowCYQMessage(true);
    requestAnimationFrame(() => {
      setShowCYQMessage(false);
    });
  };

  const handleScaleBig = () => {
    handleScale(scale);
  };
  const handleScaleSmall = () => {
    handleScale(-scale);
  };

  const handleRelocation = () => {
    // 定位到当前图片
    const n = Math.floor(offsetWidth / imageContainerWidth / 2);
    setBottomStatus({
      left: boundary((showImageIdx - n) * imageContainerWidth, 0, scrollWidth - offsetWidth + 60), // 6 是两个外边距
    });
  };

  return (
    <div
      className={classNames(getCls('wrapper'), className)}
      style={{
        display: showFullWrapper ? 'block' : 'none',
        ...style,
      }}
    >
      {images[showImageIdx] === '' ? (
        <Loading />
      ) : (
        <div
          ref={showContainerRef}
          onWheelCapture={(e: any) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.deltaY < 0) {
              // 上一张图片
              handleDecreaseWithDebounce();
            } else {
              handleIncreaseWithDebounce();
            }
          }}
          className={getCls('show-container')}
          onClick={handleMaskHidden}
          style={{
            height: `calc(100% - ${bottomImageWidth + 20}px)`,
          }}
        >
          <FunctionButtonGroup
            style={{
              position: 'absolute',
              right: '2vw',
              top: '2vw',
              zIndex: 10,
            }}
            btnTypeGroup={[
              'full',
              'left-rotate',
              'right-rotate',
              'scale-small',
              'scale-big',
              'location',
              'download',
            ]}
            btnTypeGroupClick={[
              handleFullScreenImage,
              handleRotateLeft,
              handleRotateRight,
              handleScaleSmall,
              handleScaleBig,
              handleRelocation,
            ]}
          ></FunctionButtonGroup>
          <CYQMessage show={showCYQMessage} showTime={messagePlayingTime} duration={600}>
            <>
              <ExpandOutlined
                style={{
                  fontSize: 25,
                  marginRight: 5,
                }}
              />
              {Math.floor(magnification * 100)}%
            </>
          </CYQMessage>
          <div
            className={classNames(getCls('show-btn'), getCls('show-back'))}
            onClick={() => {
              onMaskClick && onMaskClick(show);
              setShowFullWrapper(false);
            }}
          >
            <ArrowLeftOutlined />
          </div>
          <div
            className={classNames(getCls('show-btn'), getCls('show-left'))}
            onClick={handleChangeLeft}
          >
            <LeftOutlined />
          </div>
          <div
            className={classNames(getCls('show-btn'), getCls('show-right'))}
            onClick={handleChangeRight}
          >
            <RightOutlined />
          </div>
          <img
            style={{
              width: width * magnification,
              height: height * magnification,
              transform: `rotate(${rotateAngleArr[rotateAngle]}deg)`,
            }}
            src={images[showImageIdx] ? images[showImageIdx] : ''}
            alt=""
          />
        </div>
      )}

      <div
        className={getCls('bottom-container')}
        style={{
          height: bottomImageWidth + 20,
        }}
        ref={wrapperRef}
      >
        {isBottomOverflow ? (
          <>
            <div
              className={classNames(getCls('bottom-btn-left'), getCls('bottom-btn'))}
              onClick={handleTranslateLeft}
              style={{
                height: bottomImageWidth,
              }}
            >
              <LeftOutlined />
            </div>
            <div
              className={classNames(getCls('bottom-btn-right'), getCls('bottom-btn'))}
              onClick={handleTranslateRight}
              style={{
                height: bottomImageWidth,
              }}
            >
              <RightOutlined />
            </div>
          </>
        ) : null}
        <div
          style={{
            transform: `translateX(-${left}px)`,
            width: scrollWidth > offsetWidth ? scrollWidth : 'auto',
            height: bottomImageWidth,
          }}
          className={getCls('bottom-list')}
        >
          {imgList}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FullWrapperCard);