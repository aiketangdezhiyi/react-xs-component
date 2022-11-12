import React from 'react';
import { IProps } from './type';
import './index.less';

const getHighlightHtml = (
  keywords: string[],
  text: string,
  highlightColor?: string,
  type: 'background' | 'text' = 'text',
) => {
  const pattern = keywords
    .map((keyword) => keyword.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&'))
    .join('|');

  const reg = new RegExp(`(${pattern}){1}`, 'g');
  if (highlightColor) {
    return text.replace(reg, `<span style='color:${highlightColor}' class='high-light'>$&</span>`);
  } else {
    if (type === 'text') {
      return text.replace(reg, "<span class='high-light'>$&</span>");
    } else {
      return text.replace(reg, "<span class='high-light bg-light'>$&</span>");
    }
  }
};

const HighlightText = (props: IProps) => {
  const { keywords, text, className, style, highlightColor, type = 'text' } = props;

  return (
    <span
      style={style}
      className={className}
      dangerouslySetInnerHTML={{
        __html: getHighlightHtml(keywords, text, highlightColor, type),
      }}
    ></span>
  );
};

export default React.memo(HighlightText);
