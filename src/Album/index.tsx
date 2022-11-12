import { setCommonCls, setCompCommonCls } from '../utils/myUtils';
import classNames from 'classnames';
import React from 'react';
import './index.less';
import { ICompProps } from '../type';

interface IProps extends ICompProps {
  /** 封面 */
  image: string;
  /** 共有多少张图片 */
  number: number;
  title: string;
  /** 默认 200 */
  width?: number;
  /** 图片高度 默认150 */
  imageHeight?: number;
  onClick?: (e: any) => void;
}

const Album = (props: IProps) => {
  const { image, number, width = 200, imageHeight = 150, title, onClick, style, className } = props;
  const getCls = setCompCommonCls('album');
  return (
    <div
      className={classNames(getCls('container'), className)}
      style={{
        width,
        ...style,
      }}
      onClick={onClick}
    >
      <div
        className={getCls('image')}
        style={{
          height: imageHeight,
        }}
      >
        <img src={image} alt="" />
      </div>
      <div className={getCls('bottom')}>
        {title}
        <span>({number}张)</span>
      </div>
      <div className={getCls('bg')}></div>
    </div>
  );
};

export default React.memo(Album);
