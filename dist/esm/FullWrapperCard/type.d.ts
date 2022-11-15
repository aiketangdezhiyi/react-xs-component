import { ICompProps } from '../type';
export interface IProps extends ICompProps {
  /** 图片数组 */
  images: string[];
  /** 是否展示 */
  show?: boolean;
  /** 点击遮罩后的回调 */
  onMaskClick?: (status: boolean) => void;
  /** 底层每一张图片的宽度 默认66 */
  bottomImageWidth?: number;
  /** 优先加载多少张图片 默认27 */
  preloadNum?: number;
  /** 每次放大缩小的倍数 默认 .25 */
  scale?: number;
  /** 信息提示时长 默认 1000 */
  messagePlayingTime?: number;
}
export declare type rotateAngelType = 0 | 90 | 180 | 270;
export declare const rotateAngleArr: rotateAngelType[];
export declare type showImageInfoType = {
  width: number;
  height: number;
  originWidth: number;
  originHeight: number;
  containerWidth: number;
  containerHeight: number;
  rotateAngle: number;
  magnification: number;
};
export declare enum ERotateAngle {
  'zero' = 0,
  'ninety' = 1,
  'one hundred and eighty' = 2,
  'two hundred and seventy' = 3,
}
export declare type virtualListType = {
  startIdx: number;
  endIdx: number;
  startDomLeft: number;
  width: number;
};
