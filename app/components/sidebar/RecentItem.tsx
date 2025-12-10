import React from 'react';

interface RecentItemProps {
  title: string;
  time: string;
  isCollapsed?: boolean;
}

const RecentItem: React.FC<RecentItemProps> = ({ title, time, isCollapsed = false }) => {
  return (
    <div
      className="recent-item"
      style={{
        padding: '12px',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
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
        style={{ flex: 1, display: isCollapsed ? 'none' : 'block' }}
      >
        <div
          className="recent-title"
          style={{
            fontSize: '14px',
            color: '#475569',
            marginBottom: '2px'
          }}
        >{title}</div>
        <div
          className="recent-time"
          style={{
            fontSize: '12px',
            color: '#94a3b8'
          }}
        >{time}</div>
      </div>
    </div>
  );
};

export default RecentItem;