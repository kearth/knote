import React from 'react';
import RecentItem from './RecentItem';

// 本地定义接口，避免导入导出问题
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
  onPageChange?: (page: string) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isCollapsed,
  sidebarCollapsed,
  items,
  onToggle,
  onPageChange
}) => {
  // 当侧边栏收起时，自动折叠所有可折叠项目
  const actualCollapsed = sidebarCollapsed ? true : isCollapsed;
  return (
    <div
      className="collapsible-section"
      style={{
        marginBottom: sidebarCollapsed ? '0px' : '10px',
        position: 'relative'
      }}
    >
      <div
        className={`nav-item collapsible ${sidebarCollapsed ? 'collapsed-no-hover' : ''}`}
        onClick={() => !sidebarCollapsed && onToggle()}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          gap: sidebarCollapsed ? '0px' : '10px',
          padding: sidebarCollapsed ? '10px 0px' : '10px 12px',
          cursor: sidebarCollapsed ? 'default' : 'pointer',
          transition: 'background 0.2s',
          color: '#6b7280',
          fontSize: '13px',
          position: 'relative',
          zIndex: 2,
          pointerEvents: sidebarCollapsed ? 'none' : 'auto'
        }}
      >
        <span
          className="nav-icon collapsible-nav-icon"
        >
          {icon}
          <div
            className="collapse-indicator"
            style={{
              transition: 'opacity 0.2s ease',
              zIndex: 1
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              style={{
                transition: 'transform 0.2s ease',
                transform: actualCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                width: '16px',
                height: '16px'
              }}
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </span>
        <span style={{ marginLeft: '12px', display: sidebarCollapsed ? 'none' : 'block' }}>{title}</span>
      </div>
      {/* 折叠内容区域 */}
      <div
        className="collapsible-content"
        style={{
          paddingLeft: sidebarCollapsed ? '0px' : '28px',
          zIndex: 3,
          position: 'relative',
          maxHeight: actualCollapsed ? '0' : '500px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
          opacity: actualCollapsed ? 0 : 1,
          transformOrigin: 'top'
        }}
      >
        {/* 引导线 - 只在侧边栏展开时显示 */}
        {!sidebarCollapsed && (
          <div
            style={{
              position: 'absolute',
              left: '21px',
              top: '0',
              bottom: '0',
              width: '1px',
              backgroundColor: '#e2e8f0',
              zIndex: 1
            }}
          ></div>
        )}
        {/* 实际内容 */}
        <div className="recent-items">
          {items.map((item, index) => (
            <RecentItem key={index} title={item.title} time={item.time} isCollapsed={sidebarCollapsed} onClick={() => onPageChange?.('other')} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;