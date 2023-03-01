/// <reference types="react" />
import { showImageInfoType } from '../type';
/**
 *
 * @param images 图片数组
 * @param showImageIdx 展示图片的索引
 * @param show 是否展示
 * @returns
 */
export declare const useAdaptivePicture: (images: string[], showImageIdx: number, show: boolean) => {
    showImageInfo: showImageInfoType;
    setShowImageInfo: import("ahooks/lib/useSetState").SetState<showImageInfoType>;
    showContainerRef: import("react").RefObject<HTMLDivElement>;
    wrapperRef: import("react").RefObject<HTMLDivElement>;
    width: number;
    height: number;
    rotateAngle: number;
    magnification: number;
};
