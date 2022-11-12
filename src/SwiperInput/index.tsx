import { setCommonCls } from '../utils/myUtils';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './index.less';
import { ICompProps } from '../type';
export type presetType = {
  word: string;
  icon?: ReactNode;
};

interface IProps extends ICompProps {
  /** 预设搜索词 字符串 */
  presetWordString: presetType[];
  /** 每个搜索词出现的时长 单位ms */
  duration?: number;
  /** 点击按钮的回调 */
  onClick?: (value: string) => void;
  /** 按钮的标题  默认搜索 */
  btnTitle?: string;
  /** 按钮的icon图标 */
  btnIcon?: ReactNode;
  showClear?: boolean;
  placeholder?: string;
  width?: number;
  buttonStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export default (props: IProps) => {
  const {
    presetWordString = [],
    duration = 3000,
    onClick,
    showClear = true,
    width = 480,
    btnIcon = <SearchOutlined />,
    btnTitle = '搜索',
    placeholder = '请输入内容',
    buttonStyle,
    inputStyle,
    style,
    className,
  } = props;

  const [placeholderIdx, setPlaceholderIdx] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyWord, setKeyWord] = useState('');

  const timerRef = useRef<any>();
  useEffect(() => {
    if (presetWordString.length === 0) {
      presetWordString.push({
        word: placeholder,
      });
    }
  }, [placeholder]);
  const activePreset = presetWordString[placeholderIdx];
  const getCls = setCommonCls('comp', 'preset', 'input');
  useEffect(() => {
    if (keyWord) {
      return;
    }
    timerRef.current = setTimeout(() => {
      const idx = (placeholderIdx + 1) % presetWordString.length;
      setPlaceholderIdx(idx);
    }, duration);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [presetWordString, duration, placeholderIdx, timerRef.current, keyWord]);

  const handleChangeKeyword = (e: any) => {
    setKeyWord(e.target.value);
  };

  const onSearchClick = () => {
    onClick && onClick(keyWord ? keyWord : activePreset.word);
  };

  return (
    <div
      className={classNames(getCls('container'), className)}
      style={{
        width,
        ...style,
      }}
    >
      <span
        className={getCls('icon')}
        style={{
          display: activePreset.icon ? 'flex' : 'none',
        }}
      >
        {activePreset.icon}
      </span>
      <input
        value={keyWord}
        onChange={() => {}}
        onInput={handleChangeKeyword}
        className={getCls('search')}
        ref={inputRef}
        type="text"
        placeholder={activePreset.word}
        style={{
          textIndent: activePreset.icon ? 32 : 12,
          ...inputStyle,
        }}
      />
      <div className={getCls('gradient')}></div>

      {showClear && keyWord.length > 0 ? (
        <span className={getCls('clear')}>
          <CloseOutlined
            onClick={() => {
              setKeyWord('');
            }}
          />
        </span>
      ) : null}
      <button className={getCls('btn')} style={buttonStyle} onClick={onSearchClick}>
        {btnIcon}
        {btnTitle}
      </button>
    </div>
  );
};
