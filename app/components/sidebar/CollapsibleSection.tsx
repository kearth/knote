import React from 'react';
import RecentItem from './RecentItem';

interface CollapsibleItem {
  title: string;
  time: string;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  sidebarCollapsed: boolean;
  items: CollapsibleItem[];
  onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isCollapsed,
  sidebarCollapsed,
  items,
  onToggle
}) => {
  return (
    <div
      className="collapsible-section"
      style={{ position: 'relative' }}
    >
      <div
        className="nav-item collapsible"
        onClick={onToggle}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          gap: '12px',
          padding: '12px 12px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          color: '#6b7280',
          fontSize: '14px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span className="nav-icon">
          {icon}
        </span>
        <span style={{ marginLeft: '12px', display: sidebarCollapsed ? 'none' : 'block' }}>{title}</span>
        <div
          className="collapse-indicator"
          style={{
            opacity: 0,
            transition: 'opacity 0.2s ease',
            position: 'absolute',
            right: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: 'transform 0.2s ease',
              transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'
            }}
          >
            {isCollapsed ? (
              // 折叠状态显示 > 图标
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"></path>
            ) : (
              // 展开状态显示向下箭头
              <path d="M18 9l-6 6-6-6" strokeLinecap="round" strokeLinejoin="round"></path>
            )}
          </svg>
        </div>
      </div>
      {!isCollapsed && (
        <div
          className="collapsible-content"
          style={{
            paddingLeft: '38px',
            zIndex: 3,
            position: 'relative'
          }}
        >
          <div
            className="recent-items"
            style={{
              position: 'relative'
            }}
          >
            {/* 引导线 */}
            <div
              style={{
                content: '\'\'',
                position: 'absolute' as 'absolute',
                left: '-18px',
                top: '0',
                bottom: '0',
                width: '1px',
                backgroundColor: '#e2e8f0',
                zIndex: 1
              }}
            ></div>
            {items.map((item, index) => (
              <RecentItem key={index} title={item.title} time={item.time} isCollapsed={sidebarCollapsed} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;