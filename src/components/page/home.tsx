import React from 'react';

interface ContentCard {
  icon: string;
  title: string;
  description: string;
  metaIcon: string;
  metaText: string;
}

export default function Home() {
  const recentCards: ContentCard[] = [
    { 
      icon: '📝', 
      title: '新数据库', 
      description: '创建一个新的数据库来组织您的信息', 
      metaIcon: '📅', 
      metaText: '今天 12月8日' 
    },
    { 
      icon: '📝', 
      title: '正在处理的项目', 
      description: '查看您当前正在处理的项目', 
      metaIcon: '📅', 
      metaText: '今天 12月8日' 
    },
    { 
      icon: '📝', 
      title: '计划与任务', 
      description: '管理您的计划和任务', 
      metaIcon: '📅', 
      metaText: '今天 12月8日' 
    }
  ];

  const upcomingCards: ContentCard[] = [
    { 
      icon: '📅', 
      title: '将 AI 速记与你的日历事件连接', 
      description: '在 Notion 中加入通话、转录音频和总结会议。', 
      metaIcon: '📅', 
      metaText: '今天 12月8日' 
    },
    { 
      icon: '📅', 
      title: '团队晨会', 
      description: '9:00 · 办公室', 
      metaIcon: '📝', 
      metaText: '加入并做笔记' 
    },
    { 
      icon: '📅', 
      title: '项目进度检查', 
      description: '10:00 · 办公室', 
      metaIcon: '📅', 
      metaText: '周二 12月9日' 
    }
  ];

  return (
    <div className="workspace">
      <div className="workspace-header">
        <h1 className="workspace-title">下午好呀</h1>
        <p className="workspace-subtitle">有什么可以帮助您的吗？</p>
      </div>

      <div className="search-container-large">
        <div className="search-icon">🔍</div>
        <input type="text" className="search-input-large" placeholder="What do you want to know?" />
        <div className="search-actions">
          <button className="search-action-btn">DeepSearch</button>
          <button className="search-action-btn">Create Image</button>
          <button className="search-action-btn">Pick Personas</button>
          <button className="search-action-btn">Voice</button>
          <button className="search-action-btn primary">Auto</button>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">最近访问</h2>
          <span className="section-link">查看全部</span>
        </div>
        <div className="content-grid">
          {recentCards.map((card, index) => (
            <div key={index} className="content-card">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <div className="card-meta">
                <span className="card-meta-icon">{card.metaIcon}</span>
                <span>{card.metaText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2 className="section-title">活动预告</h2>
          <span className="section-link">查看全部</span>
        </div>
        <div className="content-grid">
          {upcomingCards.map((card, index) => (
            <div key={index} className="content-card">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <div className="card-meta">
                <span className="card-meta-icon">{card.metaIcon}</span>
                <span>{card.metaText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
