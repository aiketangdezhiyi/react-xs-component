import { getImageSize, ImageSize } from 'yuxuannnn_utils';
import { useSetState } from 'ahooks';
import { useEffect, useRef } from 'react';
import { showImageInitState } from '../state';
import { showImageInfoType } from '../type';
import { computedImageSize, computedInfoType } from '../utils';

/**
 *
 * @param images 图片数组
 * @param showImageIdx 展示图片的索引
 * @param show 是否展示
 * @returns
 */
export const useAdaptivePicture = (images: string[], showImageIdx: number, show: boolean) => {
  // 一个自适应图片的hook 通用性不高 作为组件hook
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showImageInfo, setShowImageInfo] = useSetState<showImageInfoType>(showImageInitState);
  const showContainerRef = useRef<HTMLDivElement>(null);
  const { width, height, rotateAngle, magnification } = showImageInfo;
  useEffect(() => {
    // 保证图片变化时，图片比例始终与容器保持最优
    getImageSize(images[showImageIdx]).then((imageSize: ImageSize) => {
      if (!showContainerRef.current) {
        return;
      }
      const computedInfo: computedInfoType = {
        originWidth: imageSize.width,
        originHeight: imageSize.height,
        containerWidth: showContainerRef.current.clientWidth,
        containerHeight: showContainerRef.current.clientHeight,
        rotateAngle: 0,
      };
      setShowImageInfo({
        ...computedInfo,
        ...computedImageSize(computedInfo),
        magnification: 1,
      });
    });
  }, [showImageIdx, show, images]);
  return {
    showImageInfo, // 展示图片的信息 showImageInfoType
    setShowImageInfo,
    showContainerRef, // 展示图片容器的ref
    wrapperRef, // 底部容器的ref
    width,
    height,
    rotateAngle,
    magnification,
  };
};
