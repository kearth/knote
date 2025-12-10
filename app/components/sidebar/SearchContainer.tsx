import React from 'react';

interface SearchContainerProps {
  placeholder?: string;
  isCollapsed?: boolean;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ placeholder = '搜索笔记...', isCollapsed = false }) => {
  return (
    <div className="search-container" style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      padding: isCollapsed ? '10px 0' : '10px'
    }}>
      <div className="nav-icon">
        {/* Material Design 3 搜索图标 */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round"></line>
        </svg>
      </div>
      {!isCollapsed && <input type="text" className="search-input" placeholder={placeholder} />}
    </div>
  );
};

export default SearchContainer;