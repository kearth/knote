import React from 'react';

interface RecentItem {
  icon: string;
  title: string;
  time: string;
}

const Sidebar: React.FC = () => {
  const recentVisits: RecentItem[] = [
    { icon: '📝', title: '设计皇帝背景文字游戏指南', time: '2小时前' },
    { icon: '📝', title: '道教符箓网页游戏界面设计', time: '昨天' },
    { icon: '📝', title: '科举功名与德财关系表格', time: '3天前' }
  ];

  const historyItems: RecentItem[] = [
    { icon: '📝', title: '清光绪升官图：流程与讽刺', time: 'December' },
    { icon: '📝', title: 'Go 包生成古代中文人名', time: 'December' },
    { icon: '📝', title: 'Go Install Tea CLI Update', time: 'December' },
    { icon: '📝', title: 'Go工具更新与版本管理', time: 'November' },
    { icon: '📝', title: 'GORM Context Cancel Error', time: 'November' }
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/images/logo.jpg" width="96" height="96" alt="logo" />
        </div>
      </div>

      <div className="search-container">
        <input type="text" className="search-input" placeholder="搜索笔记..." />
      </div>

      <nav className="nav-section">
        <div className="nav-item active" data-page="chat">
          <span className="nav-icon">💬</span>
          <span>对话</span>
        </div>
        <div className="nav-item" data-page="voice">
          <span className="nav-icon">🎙️</span>
          <span>语音</span>
        </div>
        <div className="nav-item" data-page="imagine">
          <span className="nav-icon">🖼️</span>
          <span>图像</span>
        </div>
        <div className="nav-item" data-page="projects">
          <span className="nav-icon">📁</span>
          <span>项目</span>
        </div>
        <div className="nav-item" data-page="pinned">
          <span className="nav-icon">⭐</span>
          <span>置顶</span>
        </div>
      </nav>

      <div className="pages-section">
        <div className="section-title">最近访问</div>
        <div className="recent-items">
          {recentVisits.map((item, index) => (
            <div key={index} className="recent-item">
              <div className="recent-icon">{item.icon}</div>
              <div className="recent-info">
                <div className="recent-title">{item.title}</div>
                <div className="recent-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">历史记录</div>
        <div className="recent-items">
          {historyItems.map((item, index) => (
            <div key={index} className="recent-item">
              <div className="recent-icon">{item.icon}</div>
              <div className="recent-info">
                <div className="recent-title">{item.title}</div>
                <div className="recent-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="add-page-btn">
          <span>➕</span>
          <span>新建页面</span>
        </button>
      </div>

      <div className="user-section">
        <div className="user-avatar">J</div>
        <div className="user-info">
          <div className="user-name">John Doe</div>
          <div className="user-status">Premium</div>
        </div>
        {/* <button className="upgrade-btn">Upgrade</button> */}
      </div>
    </aside>
  );
};

export default Sidebar;