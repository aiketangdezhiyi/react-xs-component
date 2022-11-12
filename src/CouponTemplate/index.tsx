import React from 'react';
import { IProps } from './type';
import './index.less';
import classNames from 'classnames';
export default (props: IProps) => {
  const { topContent, bottomContent, type = 'circle', borderColor, style, className } = props;

  let middleJSX = null;

  if (type === 'circle') {
    middleJSX = [];
    for (let i = 0; i < 27; i++) {
      middleJSX.push(<span className="circle" key={i}></span>);
    }
  } else {
    middleJSX = <div className="dashed"></div>;
  }
  return (
    <div className={classNames('coupon-template-container', className)} style={style}>
      <div
        className="coupon-top"
        style={{
          borderColor: borderColor || 'rgba(104, 84, 240, 0.15)',
        }}
      >
        {topContent}
      </div>
      <div
        className="coupon-middle"
        style={{
          color: borderColor || 'rgba(104, 84, 240, 0.15)',
        }}
      >
        {middleJSX}
      </div>
      <div
        className="coupon-bottom"
        style={{
          borderColor: borderColor || 'rgba(104, 84, 240, 0.15)',
        }}
      >
        {bottomContent}
      </div>
    </div>
  );
};
