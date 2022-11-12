import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
interface IProps {
  style?: React.CSSProperties;
  className?: string;
}
export default (props: IProps) => {
  const { style = {} } = props;
  if (!style.width) {
    style.width = `100%`;
    style.height = `100%`;
  }
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1890ff',
        ...style,
      }}
    >
      <LoadingOutlined
        style={{
          fontSize: 60,
        }}
      />
    </div>
  );
};
