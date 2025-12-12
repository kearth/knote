import React from 'react';

// 定义接口
export interface RecentItemData {
  title: string;
  time: string;
}

export interface RecentItemProps {
  title: string;
  time: string;
  isCollapsed?: boolean;
}

const RecentItem: React.FC<RecentItemProps> = ({ title, time, isCollapsed = false }) => {
  // 截断标题，只显示前15个字符
  const truncatedTitle = title.length > 15 ? `${title.substring(0, 15)}...` : title;
  
  return (
    <div
      className="recent-item"
      style={{
        padding: '6px 12px',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div
        className="recent-content"
        style={{ flex: 1, display: isCollapsed ? 'none' : 'block', overflow: 'hidden' }}
      >
        <div
          className="recent-title"
          style={{
            fontSize: '13px',
            color: '#475569',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >{truncatedTitle}</div>
      </div>
    </div>
  );
};

export default RecentItem;