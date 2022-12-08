/// <reference types="react" />
/** 纵向拖拽 */
export declare const usePortraitDrag: (maxTop: number) => {
  dragY: number;
  onDragStart: (e: any) => void;
  isDragRef: import('react').MutableRefObject<boolean>;
  setDragY: (newDragY: number) => void;
};
