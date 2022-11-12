import classNames from 'classnames';
import { Avatar } from 'antd';
import React, { useState } from 'react';
import { ICompProps } from '../type';
import { setCompCommonCls } from '../utils/myUtils';
import './index.less';

interface IProps extends ICompProps {
  /** 按钮标题 */
  btnTitle: string;
  /** 文本框最多可以写多少个字 默认300 */
  maxCommentNum?: number;
  /** 是否有头像 */
  avatar?: string;
  /** 文本框高度 */
  textareaHeight?: number;
  avatarSize?: number;
  avatarStyle?: React.CSSProperties;
  onAvatarClick?: (e: any) => void;
  placeholder?: string;
  /** 边框样式 默认实线 */
  borderStyle?: 'dashed' | 'solid';
  /** 点击按钮的回调 */
  onSubmit?: (value: string) => void;
  /** 昵称 */
  nickname?: string;
  /** 主题根据背景来决定 */
  theme?: 'light' | 'dark';
}

const Comment = (props: IProps) => {
  const {
    btnTitle,
    maxCommentNum = 300,
    avatarSize = 55,
    placeholder = '请输入内容',
    textareaHeight = 150,
    nickname,
    onSubmit = () => {},
    avatar,
    borderStyle = 'solid',
    theme = 'light',
    style,
    avatarStyle,
    onAvatarClick,
    className,
  } = props;

  const [comment, setComment] = useState('');

  const getCls = setCompCommonCls('comment', theme);

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <div className={classNames(getCls('wrapper'), className)}>
      <div className={classNames(getCls('left'))} onClick={onAvatarClick}>
        {avatar ? (
          <Avatar
            size={avatarSize}
            style={{
              filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,.5))',
            }}
            src={avatar}
          ></Avatar>
        ) : null}
        {nickname ? <span className={classNames(getCls('nickname'))}>{nickname}</span> : null}
      </div>
      <div className={classNames(getCls('right'))}>
        <textarea
          onChange={handleCommentChange}
          value={comment}
          placeholder={placeholder}
          style={{
            borderStyle: borderStyle,
            height: textareaHeight,
            ...style,
          }}
          maxLength={maxCommentNum}
          className={classNames(getCls('textarea'))}
        ></textarea>
        <span
          style={{
            top: textareaHeight - 30,
          }}
          className={classNames(getCls('count'))}
        >
          {comment.length} / {maxCommentNum}
        </span>
        <button
          onClick={() => {
            onSubmit(comment);
          }}
          className={classNames(getCls('btn'))}
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Comment);
