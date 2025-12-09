import React from 'react';

interface ToolbarProps {
  onToggleSidebar: () => void;
  onToggleView: () => void;
  onShowHistory: () => void;
  onToggleStar: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onToggleSidebar,
  onToggleView,
  onShowHistory,
  onToggleStar
}) => {
  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">主页</span>
        </div>
      </div>
      <div className="toolbar-right">
        <button className="toolbar-btn" onClick={onToggleView} title="切换视图">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button className="toolbar-btn" onClick={onShowHistory} title="历史记录">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </button>
        <button className="toolbar-btn" onClick={onToggleStar} title="收藏">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
        <button className="share-btn">分享</button>
      </div>
    </header>
  );
};

export default Toolbar;