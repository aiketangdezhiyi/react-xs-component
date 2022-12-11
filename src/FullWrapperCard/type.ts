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
  /** 每次放大缩小的倍数 默认 .25 */
  scale?: number;
  /** 信息提示时长 默认 1000 */
  messagePlayingTime?: number;
}

export type rotateAngelType = 0 | 90 | 180 | 270; // 旋转角度

export const rotateAngleArr: rotateAngelType[] = [0, 90, 180, 270];

export type showImageInfoType = {
  width: number;
  height: number;
  originWidth: number;
  originHeight: number;
  containerWidth: number;
  containerHeight: number;
  rotateAngle: number;
  magnification: number; // 放大的倍数
};

export enum ERotateAngle {
  'zero',
  'ninety',
  'one hundred and eighty',
  'two hundred and seventy',
}

export type virtualListType = {
  startIdx: number; // 起始渲染的元素的索引
  endIdx: number; // 最终渲染元素的索引
  startDomLeft: number; // 其实元素的偏离位置
};
