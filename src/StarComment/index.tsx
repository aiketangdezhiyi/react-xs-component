import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
interface IProps {
  /** 总共多少颗星星 */
  stars: number;
  /** 亮多少颗星星 */
  light: number;
  /** 有传就有评价 */
  comments?: string[];
  /** 是否动态可控 可以评价 */
  dynamic?: boolean;
  starStyle?: React.CSSProperties;
  starActiveStyle?: React.CSSProperties;
  commentStyle?: React.CSSProperties;
  className?: string;
}

export default (props: IProps) => {
  let {
    stars,
    light,
    comments = [],
    dynamic = false,
    starStyle,
    starActiveStyle,
    commentStyle,
    className,
  } = props;

  const [starIndex, setStarIndex] = useState<number>(0);

  let commentJSX = null;
  if (light > stars) {
    light = stars;
  }
  if (comments && comments.length > stars) {
    return null;
  }

  useEffect(() => {
    setStarIndex(light);
  }, [light]);

  commentJSX = (
    <span className="star-comment" style={commentStyle}>
      {comments[starIndex - 1]}
    </span>
  );

  const selectRef = useRef<boolean>(false); // 动态时是否已经评价

  const handleClick = () => {
    selectRef.current = true;
  };

  const starsList = useMemo(() => {
    const starsList = [];
    for (let i = 0; i < stars; i++) {
      let handleMouseEnter: React.MouseEventHandler<HTMLSpanElement> | undefined = void 0;
      if (dynamic && !selectRef.current) {
        handleMouseEnter = () => {
          if (selectRef.current) {
            return;
          }
          setStarIndex(i + 1);
        };
      }
      i < starIndex &&
        starsList.push(
          <span
            key={i}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            className="star-item light"
            style={starActiveStyle}
          ></span>,
        );
      i >= starIndex &&
        starsList.push(
          <span
            key={i}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            className="star-item"
            style={starStyle}
          ></span>,
        );
    }
    return starsList;
  }, [stars, starIndex]);

  return (
    <div className={classNames('star-container', className)}>
      <div className="star-wrapper">{starsList}</div>
      {commentJSX}
    </div>
  );
};
