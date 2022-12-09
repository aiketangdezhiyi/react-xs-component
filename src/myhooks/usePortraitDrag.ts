import { boundary } from 'yuxuannnn_utils';
import { useLatest } from 'ahooks';
import { useRef, useState } from 'react';
import { useForce } from 'xshooks';
import { useMount } from 'xshooks';

/** 纵向拖拽 */
export const usePortraitDrag = (maxTop: number) => {
  const [dragY, setDragY] = useState(0);
  const isDragRef = useRef(false);
  const lastDragYRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const maxTopRef = useLatest(maxTop);
  const { refresh } = useForce();
  const onDragStart = (e: any) => {
    dragStartPosRef.current = e.screenY;
    isDragRef.current = true;
    lastDragYRef.current = dragY;
    refresh();
  };

  const onDragEnd = () => {
    isDragRef.current = false;
    refresh();
  };
  const onDragMove = (e: any) => {
    if (!isDragRef.current) {
      return;
    }
    const disY = e.screenY - dragStartPosRef.current;
    setDragY(boundary(lastDragYRef.current + disY, 0, maxTopRef.current));
  };

  useMount(() => {
    document.addEventListener('mousemove', onDragMove);

    return () => {
      document.removeEventListener('mousemove', onDragMove);
    };
  });

  useMount(() => {
    document.addEventListener('mouseup', onDragEnd);

    return () => {
      document.removeEventListener('mouseup', onDragEnd);
    };
  });

  return {
    dragY,
    onDragStart,
    isDragRef,
    setDragY: (newDragY: number) => {
      setDragY(boundary(newDragY, 0, maxTopRef.current));
    },
  };
};
