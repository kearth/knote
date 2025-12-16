import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Workspace from './components/Workspace';
import CommandMenu from './components/CommandMenu';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('您的个人空间已准备就绪，可以开始创作了！');
  // 当前显示的页面
  const [currentPage, setCurrentPage] = useState('home');
  
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleView = () => {
    // 切换视图逻辑
    console.log('切换视图');
  };

  const handleShowHistory = () => {
    // 显示历史记录逻辑
    console.log('显示历史记录');
  };

  const handleToggleStar = () => {
    // 收藏/取消收藏逻辑
    console.log('切换收藏状态');
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="app-container">
      {/* 应用拖拽区域 - 支持拖拽移动应用 */}
      <div className="app-drag-region" data-tauri-drag-region></div>
      
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleSidebar={handleToggleSidebar} onPageChange={handlePageChange} />
      
      <main className="main-content">
        <Toolbar 
          onToggleSidebar={handleToggleSidebar}
          onToggleView={handleToggleView}
          onShowHistory={handleShowHistory}
          onToggleStar={handleToggleStar}
        />
        
        <Workspace currentPage={currentPage} />
      </main>
      
      <CommandMenu />
      
      <Notification 
        isVisible={notificationVisible}
        message={notificationMessage}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default App;